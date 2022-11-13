const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const bodyParser = require("body-parser") // post 요청 파라미터 사용
app.set('port', 8084)



app.get("/", async (req, res, next) => {
    const result = require('child_process').spawn('python3', ['./PythonScript/test.py', 'userid'])
    await result.stdout.on('data', (data) => {
        res.send( data.toString() )
    })
})



app.listen(app.get('port'), () => {
    console.log(app.get('port') , "번 포트에서 안드로이드서 서버 시작.")
})