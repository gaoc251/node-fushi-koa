const { execute, executeTransaction } = require('../db/execute')

const FushiModels = require('../models/fushi')

class FushiService {
    static async getList (params) {
        return await execute(FushiModels.queryList, params)
    }
    static async getDetail (params) {
        return await execute(FushiModels.queryDetail, params)
    }

    static async getCollectState (params) {
        return await execute(FushiModels.queryCollectState, params)
    }

    static async updateFushiCollect (params) {
        return await execute(FushiModels.updateCollectState, params)
    }
    
}

module.exports = FushiService