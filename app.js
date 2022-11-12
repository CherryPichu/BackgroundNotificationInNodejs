const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const bodyParser = require("body-parser") // post 요청 파라미터 사용
app.set('port', 8084)

app.get("/", (req, res, next) => {
    res.send("시작")
})




app.listen(app.get('port'), () => {
    console.log(app.get('port') , "번 포트에서 안드로이드서 서버 시작.")
})