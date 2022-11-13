
const sql = require('./db.config.js')

/**
 * @swagger
 *  components :
 *   schemas :
 *    KEYWORD : 
 *      properties :
 *       userid :
 *          type : int(11)
 *       createAt :
 *          type : timestamp
 *       keyword : 
 *          type : varchar(100)
 *      listcode :
 *          type : varhcar(10)
 * 
 */


 const KEYWORD = function (KEYWORD) { // 생성자
    this.createAt = KEYWORD.createAt;
    this.userid = uesr.userid;

}

/* 참고
https://1-day-1-coding.tistory.com/51
CURD MODEL 만들기
*/

MakeWhereWord = (byKEYWORD) => {
query = " WHERE "
let cnt = 0;
for(const id in byKEYWORD ){
    

    if(byKEYWORD[id] != null){
        if(cnt == 0 ) { // 첫번째는 AND 를 안붙임.
            cnt += 1;
            query += '`'+id + '`' + " = " +'"'+ byKEYWORD[id]+ '"';
        }else{
            query += " AND "+ '`'+id + '`' + " = " + '"'+byKEYWORD[id] + '"';
        }
        

    }
        
}
return query
}
KEYWORD.create  = (newKEYWORD, result) =>{
sql.query('insert into KEYWORD SET ? ', newKEYWORD, (err, res) => {
    if(err){
        console.log("error : ", err)
        result(err, null)
        return;
    }

    result(null, res)
    // console.log("Created KEYWORD : ", {id : res.insertId, email : res.email, newKEYWORD})
})
}

KEYWORD.findByKEYWORD = (byKEYWORD, result) => {

let query = "SELECT * FROM KEYWORD ";
query = query + MakeWhereWord(byKEYWORD) // Where 문을 조립
// console.log(query) // 
sql.query(query, (err, res) => {
    if(err){
        console.log("error : ", err);
        result(err, null)
        return;
    }
    result(null , res[0]) // 찾은 유저 정보만 던져줌.
})


}


KEYWORD.getAll = (result) => {

sql.query("SELECT * FROM KEYWORD" , ((err, res) => {
    if(err){
        console.log("error : ", err);
        result(err, null)
        return;
    }
    result(null, res)
}))
return 200;
}


KEYWORD.remove = (byKEYWORD, result) =>  {

let query = "DELETE FROM KEYWORD "
query = query + MakeWhereWord(byKEYWORD)

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



module.exports = KEYWORD;