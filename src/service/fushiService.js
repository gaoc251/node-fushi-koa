const { execute, executeTransaction } = require('../db/execute')

const FushiModels = require('../models/fushi')

class FushiService {
    static async getList (params) {
        return await execute(FushiModels.queryList, params)
    }
    static async getDetail (params) {
        return await execute(FushiModels.queryDetail, params)
    }
}

module.exports = FushiService