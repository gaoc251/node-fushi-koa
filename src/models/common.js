const {query, queryOne, update, insert, del} = require('../db/curd')

class CommonModels {
    static async insertUploadImg (connection) {
        console.log("insertUploadImg")
        // const sql =  `SELECT * from iconConfig`
        // const iconConfig = await insert(connection, sql, '')
        // return iconConfig
    }
}

module.exports = CommonModels