const userdb = require("../models/USER")
const keywordDb = require("../models/KEYWORD")
const router = require('express').Router()
const dotenv = require('dotenv')
dotenv.config();


/**
 * @swagger
 * paths :
 *  /query/USER :
 *      get :
 *          tags :
 *              - USER
 *          summary : userid로 유저 정보를 반환함.
 *          description : userid 4 에 해당하는 데이터를 가져옴
 *          parameters :
 *            - in : query
 *              description : 고유 userid 를 입력
 *              name : userid
 *              schemas :
 *                  type : string
 *              required : true
 *              default : 4
 *          responses :
 *              '200' :
 *                  description : Suucessful 작동
 *                  content :
 *                      application/json :
 *                          schema :
 */
router.get("/USER", (req, res, next) => {

    const userid = req.query.userid 
    userdb.findByUserId(userid, (err, content) => {
        if(err){
            res.status(404).send("에러!")
        }
        res.json(content)
    })

})


/**
 * @swagger
 * paths : 
 *  /query/USER :
 *      post : 
 *          tags : 
 *              - USER
 *          summary : 새로운 유저 등록
 *          description :  1~-100000 사이의 랜덤 userid 를 DB에 생성하고 값을 반환
 *          requsetBody :
 *              content :
 *                  application/json :
 *          responses :
 *              '200' :
 *                  description : 새로운 유저 등록 완료
 *                  content :
 *                      application/json :
 *                          schema :
 *                              userid :
 *                                  description : 새로 생성된 유저 고유 번호
 *                   
 */
router.post("/USER", (req, res, next) => {
    const newNumber = Math.round(Math.random() * 100000)
    const newUser = new userdb({ userid : newNumber })
    userdb.create(newUser ,(err, content) => {
        if(err){
            res.status(404).send("에러")
        }else{
            res.json({ userid : newNumber })
        }
    })

})


/**
 * @swagger
 * paths : 
 *  /query/USER :
 *      put : 
 *          tags : 
 *              - USER
 *          summary : userid 값을 매개변수로 유저 정보를 수정함.
 *          description : uesrid가 4인 유저 정보를 lastCrawlingMN230 = 29928, lastCrawlinMN231 = 1757 로 설정
 *          parameters :
 *            - in : query
 *              description : 고유 userid 를 입력
 *              name : userid
 *              schemas :
 *                  type : string
 *              required : true
 *              default : 4
 *            - in : query
 *              description : 고유 userid 를 입력
 *              name : lastCrawlingMN230
 *              schemas : 
 *                  type : string
 *              required : true
 *              default : 29928
 *            - in : query
 *              description : 고유 userid 를 입력
 *              name : lastCrawlingMN231
 *              schemas : 
 *                  type : string
 *              required : true
 *              default : 1758
 * 
 *          responses :
 *              '200' :
 *                  description : 새로운 유저 등록 완료
 *                  content :
 *                      application/json :
 *                          schema :
 *                              userid :
 *                                  description : 새로 생성된 유저 고유 번호
 *                   
 */
 router.put("/USER", (req, res, next) => {
    
    if(req.query.userid == null){
        res.status(404).send("userid 쿼리가 없음")
    }

    const targetUser = {}
    if(req.query.userid != null)
        targetUser.userid = req.query.userid
    if(req.query.lastCrawlingMN230 != null)
        targetUser.lastCrawlingMN230 = req.query.lastCrawlingMN230
    if(req.query.lastCrawlingMN231 != null)
        targetUser.lastCrawlingMN231 = req.query.lastCrawlingMN231
    if(req.query.lastCrawlingMN233 != null)
        targetUser.lastCrawlingMN233 = req.query.lastCrawlingMN233
    if(req.query.lastCrawlingMN445  != null)
        targetUser.lastCrawlingMN445  = req.query.lastCrawlingMN445 

    userdb.updateByUserid(targetUser ,(err, content) => {
        if(err){
            res.status(404).send("에러")
        }else{
            res.json({ targetUser})
        }
    })


    


})



/**
 * @swagger
 * paths :
 *  /query/KEYWORD :
 *      get :
 *          tags :
 *              - KEYWORD
 *          summary :  userid로 등록된 keyword를 반환 함.
 *          description : userid 4 에 해당하는 데이터를 가져옴
 *          parameters :
 *            - in : query
 *              description : 고유 userid 를 입력
 *              name : userid
 *              schemas :
 *                  type : string
 *              required : true
 *              default : 4
 *          responses :
 *              '200' :
 *                  description : Suucessful 작동
 *                  content :
 *                      application/json :
 *                          schema :
 */
router.get("/KEYWORD", (req, res, next) => {
    
    keywordDb.findByUserId(req.query.userid, (err, content) => {
        if(err){
            res.status(404).send("에러")
        }else{
            res.send(content)
        }
    })
})


/**
 * @swagger
 * paths : 
 *  /query/KEYWORD :
 *      post : 
 *          tags : 
 *              - KEYWORD
 *          summary : keyword 생성
 *          requestBody :
 *              required : true
 *              description : "유저번호 4 가 MN230에 키워드 '국가 근로'를 등록함 "
 *              content:
 *                  application/json :
 *                      schema :
 *                          properties :
 *                              userid :
 *                                  type: string
 *                                  description : 유저 고유 번호
 *                                  default : 4
 *                              keyword :
 *                                  type: string
 *                                  description : 키워드
 *                                  default : "국가 근로"
 *                              listcode :
 *                                  type: string
 *                                  description : 유저 고유 번호
 *                                  default : "MN230"
 *          responses :
 *              '200'  :
 *                  description : Suucessful 작동
 *                  content :
 *                      application/text :
 *                      
 *                   
 */
router.post("/KEYWORD", (req, res, next) => {

    const newkeyword = new keywordDb( {
        userid: req.body.userid,
        listcode : req.body.listcode,
        keyword : req.body.keyword
    })
    keywordDb.create(newkeyword, (err, content) => {
        if(err) {
            res.status(404).send("에러")
        }else{
            res.send("키워드 등록 완료 => " + newkeyword.keyword)
        }
        
    })
})


/**
 * @swagger
 * paths :
 *  /query/KEYWORD :
 *      delete :
 *          tags :
 *              - KEYWORD
 *          summary : 
 *          description : userid = 4 AND keyword = '국가 근로' 에 해당하는 값을 제거
 *          parameters :
 *            - in : query
 *              description : 고유 userid 를 입력
 *              name : userid
 *              schemas :
 *                  type : string
 *              required : true
 *              default : 4
 *            - in : query
 *              description : 고유 userid 를 입력
 *              name : keyword
 *              schemas :
 *                  type : string
 *              required : true
 *              default : 국가 근로
 *          responses :
 *              '200' :
 *                  description : Suucessful 작동
 *                  content :
 *                      application/json :
 *                          schema :
 */
router.delete("/KEYWORD", (req,res, next)  => {
    const targetKeyword = new keywordDb({
        userid : req.query.userid,
        keyword : req.query.keyword
    })

    keywordDb.removeByKeyword(targetKeyword, (err, content) =>{
        if(err) {
            res.status(404).send("에러")
        }else{
            res.send("키워드 제거 성공 ")
        }
        
    } )

})




module.exports = router

