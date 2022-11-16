const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config();

/**
 * bodyparser - post 요청의 파라미터를 사용할 수 있게 도와줌.
 */
const bodyParser = require("body-parser") 
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json());

/**
 * setting - session 설정
 */
require("./setting/session")(app)

require("./setting/swagger/swagger")(app)

app.set('port', 8082)

const modelRouter = require("./routes/model")
app.use("/query", modelRouter)



app.get("/", async (req, res, next) => {

    // 파이썬 스크립트 실행
    const result = require('child_process').spawn('python3', ['./PythonScript/Crawling.py', 'userid'])
    await result.stdout.on('data', (data) => {
        res.send( data.toString() )
    })
})





app.listen(app.get('port'), () => {
    console.log(app.get('port') , "번 포트에서 안드로이드서 서버 시작.")
})