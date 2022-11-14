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
 *          summary : 
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
    console.log(req.query)
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
 *          summary : 새로운 유저 등록, 랜덤 번호 생성
 *          requsetBody :
 *              content :
 *                  application/json :
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
router.post("/USER", (req, res, next) => {
    const newNumber = Math.round(Math.random() * 100000)
    const newUser = new userdb({ userid : newNumber })
    userdb.create(newUser ,(err, content) => {
        if(err){
            res.status(404).send("에러")
        }
        res.json({ userid : newNumber })
    })

})



/**
 * @swagger
 * paths :
 *  /query/KEYWORD :
 *      get :
 *          tags :
 *              - KEYWORD
 *          summary : 
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
        }
        res.send(content)
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
        }  
        res.send("키워드 등록 완료")
    })
})




module.exports = router

