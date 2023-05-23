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
        const updateViewNum = await query(connection, `UPDATE fushi SET viewNum = viewNum + 1 WHERE id=${params.id}`, '')
        return updateViewNum && data
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
            const state1 = await query(connection, `UPDATE fushi SET favoriteNum = favoriteNum + 1 WHERE id=${params.id}`, {})
            return state && state1 && {state: true}
        } else {
            const sql3 =  
            `DELETE FROM user_collect where recordId='${params.id}' and openId='${params.openId}';`
            const state = await query(connection, sql3, params)
            const state1 = await query(connection, `UPDATE fushi SET favoriteNum = favoriteNum - 1 WHERE id=${params.id}`, {})
            return state && state1 && {state: false}
        }
    }

    static async queryRecommendList (connection, params) {
        const sql =  `SELECT * from fushi ORDER BY viewNum DESC LIMIT 5;`
        console.log("sql", sql)
        const list = await query(connection, sql, '')
        return list
    }
    // 
    static async queryFavList (connection, params) {
        // const sql =  `SELECT * from user_collect where openId='${params.openId}'`
        let sql1 = `SELECT recordId from user_collect where openId='${params.openId}'`
        const list1 = await query(connection, sql1, '')

        let favList = []
        for (let index = 0; index < list1.length; index++) {
            const element = list1[index];
            const sql2 =  `SELECT * from fushi where id=${element.recordId};`
            console.log("sql2", sql2)
            const item = await query(connection, sql2, '')
            favList.push(item[0])
        }
        return favList
    }

    // 
    static async querySearchList (connection, params) {
        const sql =  `SELECT * from fushi WHERE CONCAT (recordTitle,ingredients) LIKE '%${params.keyword}%';`
        console.log("sql", sql)
        const list = await query(connection, sql, '')
        return list
    }
}

module.exports = FushiModels