import sys, re, requests, json
from bs4 import BeautifulSoup
import urllib.request as req

"""
    요구사항
    0. 한기대 서버로 부터 크롤링
    1. 새로운 결과 있다면 출력 : [title, url, Date] 
    2. 새로운 결과가 없다면 출력 : ["noResult"]
    3. 가장 최근 공지 고유번호 설정(변화가 없으면 안해도됨.)
"""

# 공지사항 url, user id 및 서버 정보
generalnotice = "https://www.koreatech.ac.kr/kor/CMS/NoticeMgr/list.do?mCode=MN230"
scholarnotice = "https://www.koreatech.ac.kr/kor/CMS/NoticeMgr/scholarList.do?mCode=MN231"
bachelornotice = 'https://www.koreatech.ac.kr/kor/CMS/NoticeMgr/bachelorList.do?mCode=MN233'
employmentnotice = 'https://www.koreatech.ac.kr/kor/CMS/NoticeMgr/boardList10.do?mCode=MN445'
noticelist = [generalnotice, scholarnotice, bachelornotice, employmentnotice]
useridlink = 'http://uskawjdu.iptime.org:8084/query/USER?userid='
userkeywordlink = 'http://uskawjdu.iptime.org:8084/query/KEYWORD?userid='
userid = 4

def noticeNotification(userid):
    # 유저 공지별 키워드 정보 가져오기 # [{},{}] 형태
    r1 = requests.get(userkeywordlink + str(userid))
    j1 = json.loads(r1.text)

    # 유저 마지막 검색 공지사항 번호 가져오기 # [{},{}] 형태
    r2 = requests.get(useridlink + str(userid))
    j2 = json.loads(r2.text)

    # 공지별 키워드 딕셔너리로 구현 # ex) {'MN230':'장학'}
    filldict = {j1[i]['listcode'] : j1[i]['keyword'] for i in range(len(j1))}
    
    # 공지별로 웹크롤링 하는 함수
    def noticeCrawling(noticeurl):
        # 공지사항 태그 가져오기
        res = req.urlopen(noticeurl).read()
        soup = BeautifulSoup(res, "html.parser")
        table = soup.find('table', {'class': 'board-list-table'})
        tbody = table.select_one('tbody')
        trs = tbody.select('tr')

        # 공지사항 별로 유저 마지막으로 검색한 공지사항 번호 가져오기
        lastnum = j2[0]['lastCrawling'+noticeurl[-5:]]

        numlist = []
        title = soup.find('h2', {'class':'cont-tit'}).text

        # 검색하는 페이지 공지사항 가장 큰 숫자 가져오기
        for tr in trs:
            numb = tr.select('td')[0].text
            numlist.append(int(numb))
        try:
            for tr in trs:
                # 웹크롤링 하며 공지사항 사이트 내에 공지사항 번호 가져옴
                number = tr.select('td')[0].text

                # 유저 마지막 검색 공지사항 번호보다 크면 정보 가져옴
                if int(number) > int(lastnum):
                    link = tr.find('a').attrs['href']
                    name = tbody.find_all('span',title=re.compile(filldict[noticeurl[-5:]]))

                    # 공지사항이 MN230 일때 출력(MN230과 나머지 날짜정보의 태그 정보가 다름)
                    if noticeurl[-5:] == 'MN230':
                        nation = tr.select('td')[3].text
                        print('---'+title+'---\n', name[0].string , '\n공지 접속: https://www.koreatech.ac.kr'+link, '\n---'+nation+'---')
                    else: 
                        nation = tr.select('td')[2].text
                        print('---'+title+'---\n', name[0].string , '\n공지 접속: https://www.koreatech.ac.kr'+link, '\n---'+nation+'---')
                    
                    # 마지막 공지사항 번호 업데이트
                    requests.put(useridlink + str(userid) + '&lastCrawling' + noticeurl[-5:] + '=' + str(max(numlist)))
                    break

                # 이전에 검색한 공지사항 번호와 같아지면 멈춤
                elif int(number) == int(lastnum):
                    print('None')
                    requests.put(useridlink + str(userid) + '&lastCrawling' + noticeurl[-5:] + '=' + str(max(numlist)))
                    break
                    
        except IndexError:
            print('None')
    for noticeurl in noticelist:
        noticeCrawling(noticeurl)

def getAvgs():
    return [i for i in sys.argv]


if __name__=="__main__" :
    userId = getAvgs()[0]
    noticeNotification(userid)
    # python Crawling.py userid


