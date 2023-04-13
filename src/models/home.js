const {query, queryOne, update, insert, del} = require('../db/curd')

class HomeModels {
    static async queryIconConfig (connection) {
        const sql =  `SELECT * from iconConfig`
        const iconConfig = await query(connection, sql, '')
        return iconConfig
    }
}

module.exports = HomeModels