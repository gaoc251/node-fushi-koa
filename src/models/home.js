const {query, queryOne, update, insert, del} = require('../db/curd')

class HomeModels {
    static async queryIconConfig (connection) {
        const sql =  `SELECT * from iconConfig`
        const iconConfig = await query(connection, sql, '')
        return iconConfig
    }

    static async queryRecommendList (connection) {
        const sql =  `SELECT * from goods`
        const recommendList = await query(connection, sql, '')
        return recommendList
    }
    static async queryPintuanList (connection) {
        const sql =  `SELECT * from goods where isPintuan = 1`
        const recommendList = await query(connection, sql, '')
        return recommendList
    }
}

module.exports = HomeModels