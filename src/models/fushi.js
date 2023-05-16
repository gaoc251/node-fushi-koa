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

    static async queryCollectState (connection, params) {
        const sql =  `SELECT * from user_collect where recordId='${params.id}' and openId='${params.openId}';`
        console.log("sql", sql)
        const data = await query(connection, sql, '')
        return data.length
    }

    static async updateCollectState (connection, params) {
        const sql1 =  `SELECT * from user_collect where recordId='${params.id}' and openId='${params.openId}';`
        console.log("sql1", sql1)
        const data1 = await query(connection, sql1, '')
        console.log("data1", data1)
        // 新增
        if (!data1.length) {
            const sql2 =  
            `INSERT INTO user_collect (openId,recordId) VALUES ('${params.openId}','${params.id}');`
            const state = await query(connection, sql2, params)
            return state && {state: true}
        } else {
            const sql3 =  
            `DELETE FROM user_collect where recordId='${params.id}' and openId='${params.openId}';`
            const state = await query(connection, sql3, params)
            return state && {state: false}
        }
    }
    
}

module.exports = FushiModels