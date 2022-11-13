const userdb = require("../models/USER")
const keyworddb = require("../models/KEYWORD")
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
 *          summary : USER 테이블의 모들 데이터를 가져옴
 *          description : All data
 *          requsetBody :
 *              content :
 *                  application/json :
 *                      schema :
 *          
 *          responses :
 *              '200' :
 *                  description : Suucessful 작동
 *                  content :
 *                      application/json :
 *                          schema :
 *                              
 * 
 * components :
 *  schemas :
 *      GETUSER :
 *          type : object
 *          properties :
 *              id :
 *                  type : integer
 *                  format : int64
 *                  example : 10
 */

router.get("/USER", (req, res, next) => {
    
    userdb.getAll((err, content) => {
        if(err){
            res.send("에러!")
        }
        res.send(content)
    })

})

router.post("/USER", (req, res, next) => {
    const newUser = new userdb({userid : round(Math.random() * 10000) })
    userdb.create(newUser ,(err, content) => {
        if(err){
            res.send("에러!")
        }
        res.send(content)
    })

})

router.get("/KEYWORD", (req, res, next) => {
    
    keyworddb.getAll((err, content) => {
        if(err){
            res.send("에러!")
        }
        res.send(content)
    })

})

module.exports = router