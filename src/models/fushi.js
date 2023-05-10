const {query, queryOne, update, insert, del} = require('../db/curd')

class FushiModels {
    static async queryList (connection, params) {
        const sql =  `SELECT * from fushi where ${params.cate}='${params.id}';`
        console.log("sql", sql)
        const list = await query(connection, sql, '')
        return list
    }

    static async queryDetail (connection, params) {
        const sql =  `SELECT * from fushi where id='${params.id}';`
        console.log("sql", sql)
        const data = await query(connection, sql, '')
        return data
    }
}

module.exports = FushiModels