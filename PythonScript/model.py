
class Model :
    """
    데이터를 가져오기 반환하는 클래스 
    [멤버변수 설명]
    MN230 : 일반공지
    MN231 : 장학공지
    MN233 : 학사공지
    MN445 : 채용공지
    """
    
    def __init__(self, userId) :
        self.userId = userId
        self.lastCrawlingMN230 : int = 29863
        self.lastCrawlingMN231 : int = 1732
        self.lastCrawlingMN233 : int = 1123
        self.lastCrawlingMN445 : int = 296

    def getLastCrawling_MN230(self) -> int : # MN230 는 일반고지 코드.
        '''
        마지막으로 크롤링한 페이지 고유번호를 반환.
        MN230 -> 일반공지
        :return: ["국가근로", "장학재단"]
        '''
        return self.lastCrawlingMN230

    def setLast_MN230(self, number) :
        self.lastCrawlingMN230 = number
        
    def getKeyword_MN230(self) -> list : # MN230 는 일반고지 코드.
        '''
        Keyword 리스트를 반환.
        :return : ["국가근로", "장학재단"]
        '''
        return ["공부", "이태원 사고", "국가근로"]
    
    
    

    def getLastCrawling_MN231(self) : # MN230 는 일반고지 코드.
        '''
        마지막으로 크롤링한 페이지 고유번호를 반환.
        MN230 -> 장학공지
        '''
        return self.lastCrawlingMN231
    
    def setLast_MN231(self, number) :
        self.lastCrawlingMN231 = number
        
    def getKeyword_MN231(self) -> list : # MN230 는 일반고지 코드.
        '''
        Keyword 리스트를 반환.
        :return : ["국가근로", "장학재단"]
        '''
        return ["국가근로", "장학재단"]
        


