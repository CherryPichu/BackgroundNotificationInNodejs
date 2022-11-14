const sql = require('./db.config.js')


// 참고 : 
// https://velog.io/@godkor200/%EA%B7%80%EC%B0%AE%EC%9D%80-api-%EB%AC%B8%EC%84%9C-swagger-UI%EB%A1%9C-%EC%9E%90%EB%8F%99%ED%99%94
/**
 * @swagger
 *  components :
 *   schemas :
 *    USER : 
 *      properties :
 *       id :
 *          type : int(11)
 *       userid :
 *          type : int(11)
 *          Primary Key : true
 *       lastCrawlingMN230 : 
 *          type : int(11)
 *       lastCrawlingMN231 :
 *          type : int(11)
 *       lastCrawlingMN233 :
 *          type : int(11)
 *       lastCrawlingMN445 :
 *          type : int(11)
 *       createAt :
 *          type : timestamp
 * 
 *       
 *  */

const USER = function (user) { // 생성자
        this.userid = user.userid;
            
        this.lastCrawlingMN230 = -1
        this.lastCrawlingMN231 = -1
        this.lastCrawlingMN233 = -1
        this.lastCrawlingMN445 = -1
}

/* 참고
https://1-day-1-coding.tistory.com/51
CURD MODEL 만들기
*/

MakeWhereWord = (byUSER) => {
    query = " WHERE "
    let cnt = 0;
    for(const id in byUSER ){
        

        if(byUSER[id] != null){
            if(cnt == 0 ) { // 첫번째는 AND 를 안붙임.
                cnt += 1;
                query += '`'+id + '`' + " = " +'"'+ byUSER[id]+ '"';
            }else{
                query += " AND "+ '`'+id + '`' + " = " + '"'+byUSER[id] + '"';
            }
            

        }
            
    }
    return query
}
USER.create  = (newUSER, result) =>{
    sql.query('insert into USER SET ? ', newUSER, (err, res) => {
        if(err){
            console.log("error : ", err)
            result(err, null)
            return;
        }

        result(null, res)
        // console.log("Created USER : ", {id : res.insertId, email : res.email, newUSER})
    })
}

USER.findByUserId = (userid, result) => {
    
    let query = "SELECT * FROM USER where userid =" + userid;
    // console.log(query) // 
    sql.query(query, (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }
        result(null , res) // 찾은 유저 정보만 던져줌.
    })
    

}


USER.getAll = (result) => {
    
    sql.query("SELECT * FROM USER" , ((err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }
        result(null, res)
    }))
    return 200;
}


USER.remove = (byUSER, result) =>  {

    let query = "DELETE FROM USER "
    query = query + MakeWhereWord(byUSER)

    sql.query(query, (err, res) => {
            if(err){
                console.log("error : ", err);
                result(err, null);
                return;
            }

            if(res.affectedRows == 0){
                result({kind:"not_found"}, null)
                return;
            }

            result(null, res);
    })
}



module.exports = USER;