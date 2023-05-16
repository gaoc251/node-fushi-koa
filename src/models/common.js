const {query, queryOne, update, insert, del} = require('../db/curd')

class CommonModels {
    static async insertUploadImg (connection) {
        console.log("insertUploadImg")
        // const sql =  `SELECT * from iconConfig`
        // const iconConfig = await insert(connection, sql, '')
        // return iconConfig
    }

    static async addFushiRecord (connection, params) {
        let {recordTitle,ingredients,seasoning,cate,month,hard,tip,steps,imgList,cooking,effect,description,time} = params
        const sql =  
        `INSERT INTO fushi (recordTitle,ingredients,seasoning,cate,month,hard,tip,steps,imgList,cooking,effect,description,time,favoriteNum, viewNum) VALUES ('${recordTitle}','${ingredients}','${seasoning}','${cate}','${month}','${hard}','${tip}','${steps}','${imgList}','${cooking}','${effect}','${description}','${time}',0,0);`
        const record = await query(connection, sql, params)
        return record
    }
}

module.exports = CommonModels