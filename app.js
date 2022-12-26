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

app.set('port', 8084)

const modelRouter = require("./routes/model")
app.use("/query", modelRouter)


const nunjucks = require("nunjucks")
const path = require("path")

app.set('view engine', 'html')
nunjucks.configure('views', {
    express : app,
    watch : true,
})

app.use(express.static(path.join(__dirname, "html")))

let switchstatus = 0


/**
 * Alarm switch on off
 */
app.get("/postswitch", async (req, res, next) => {

    switchstatus = parseInt(req.query.switchstatus)

    res.send( String(switchstatus))
})

/**
 * send Alarm
 */
app.get("/BackgroundRequest", async (req, res, next) => {
    // console.log("컷")
    // const context = {"keyword" : "국가장학금", 
    // "url" :"https://www.hallym.ac.kr/sub05/cP3/sCP1.html?action=read&pageIndex=1&nttId=16321504",
    // "title" : "[교외장학금] 2023년 삼성드림클래스 대학생멘토 선발 안내"}


    // if(switchstatus == 1){
    //     res.json(context)
    // }else{
    //     res.status(404).send("null")
    // }
    // console.log(req.query.userid)

    const result = require('child_process').spawn('python3', ['./PythonScript/Crawling.py', `${req.query.userid}`])
    await result.stdout.on('data', (data) => {
        let title= ""
        let url = ""
        let keyword =""
        // console.log("data = " + data)  

        data = data.toString()
        let listData = data.split("-----------------")
        let MN230 = listData[1]
        let MN231 = listData[2]
        // console.log("listData = " + data)  
        console.log("MN231  : " + MN231)
        if(MN230.replace(/\n/g, "") != "None" && MN230.replace(/\n/g, "") != "" ){
            title = MN230.split("\n")[2]
            url = MN230.split("\n")[3]
            keyword = MN230.split("\n")[1]
            console.log("keyword : "+keyword)

            res.json({
                "url" : url,    
                "title" : title,
                "keyword" : keyword,
            })
            c
            return; 
        }

        if(MN231.replace(/\n/g, "") != "None" && MN231.replace(/\n/g, "") != "" ){
            // console.log(MN21)
            title = MN231.split("\n")[2]
            url = MN231.split("\n")[3]
            keyword = MN231.split("\n")[1]
            console.log("keyword : "+keyword)
            res.json({
                "url" : url,
                "title" : title,
                "keyword" : keyword,
            })
            return;
        }

        

    }).on("error", (err)=>{
        res.status(404).send("에러 : " + err.toString())
    })

})








app.get("/", async (req, res, next) => {

    
    res.render("index" ,{ switchstatus : switchstatus })

})





/**
 * @swagger
 * paths :
 *  /query/USER :
 *      get :
 *          tags :
 *              - USER
 *          summary : 데이터 
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
app.get("/", (req, res, next) => {

    // 파이썬 스크립트 실행
    // const result = require('child_process').spawn('python3', ['./PythonScript/Crawling.py', 'userid'])
    // await result.stdout.on('data', (data) => {
    //     res.send( data.toString() )
    // })
    res.send("ok")

})





app.listen(app.get('port'), () => {
    console.log(app.get('port') , "번 포트에서 안드로이드서 서버 시작.")
})