import sys
from model import Model

def getAvgs():
    return [i for i in sys.argv]

    """
    요구사항
    0. 서버 내부의 html을 읽어옴.
    1. 새로운 결과 있다면 출력 : [title, url, Date] 
    2. 새로운 결과가 없다면 출력 : ["noResult"]
    3. 가장 최근 공지 고유번호 설정(변화가 없으면 안해도됨.)
    """


if __name__=="__main__" :
    userId = getAvgs()[1]
    model = Model(userId)
    
    print( "실행 >>  python test.py userid " )
    print( "<br> >>인자값 출력 getAvgs() : ", getAvgs(), "<br>")


    print( "실행 >> model.getLastCrawling_MN230() : ",model.getLastCrawling_MN230() , "<br>") 
    print( "실행 >> model.getKeyword_MN230() : ",model.getKeyword_MN230() ,"<hr>") 
    
    
    # 새로운 결과 있다면 출력 : [title, url, Date] 
    print([ "공부 더 잘하는 방법? 원하는 것을 얻는 학습몰입과 동기부여 특강 / 2022.11.16.(수) 16:00 ~ 18:00 / 사전신청 식사제공 (당일참여 가능)", "https://www.koreatech.ac.kr/kor/CMS/NoticeMgr/view.do?mCode=MN230&post_seq=29906&board_id=14", "2022.11.08"])
    #새로운 결과가 없다면 출력 : ["noResult"]
    
    # 결과와 관련없이 
    model.setLast_MN230(29906) # 가장 최근 공지 고유번호 설정(변화가 없으면 안해도됨.)
    