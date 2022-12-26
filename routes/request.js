const router = require('express').Router()
const dotenv = require('dotenv')
dotenv.config();

/**
 * 요구사항
 * 1. 안드로이드 서버에 주기적으로 요청을 보낸다.
 * 2. 서버는 안드로이드의 요청을 받아서 새로운 파이썬 스크립트를 동작한다.
 * 3. 서버는 새로운 키워드가 등록되었을 경우
 * 알람을 보낼 수 있도록 title 정보가 담아 보낸다.
 * 4. 새로운 키워드가 없다면 noresult 로 응답한다.
 */

/**
 * @swagger
 * paths :
 *  /BackgroundRequest :
 *      get :
 *          tags :
 *              - Notify
 *          summary :  userid 를 매개변수로 새로운 공지를 받아옴.
 *          parameters :
 *            - in : query
 *              description : 고유 userid 를 입력
 *              name : userid
 *              schemas :
 *                  type : string
 *              required : true
 *              default : 62319
 *          responses :
 *              '200' :
 *                  description : Suucessful 작동
 *                  content :
 *                      application/json :
 *                          schema :
 */



router.get("/", (req, res, next) => {
    /**
     * 내부 스크립트 실행
     */

    res.send("알람")
})



module.exports = router