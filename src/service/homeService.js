const { execute, executeTransaction } = require('../db/execute')

const HomeModels = require('../models/home')

class HomeService {
    static async getIconConfig () {
        return await execute(HomeModels.queryIconConfig, {})
    }
    static async getRecommendList () {
        return await execute(HomeModels.queryRecommendList, {})
    }
    static async getPintuanList () {
        return await execute(HomeModels.queryPintuanList, {})
    }
}

module.exports = HomeService