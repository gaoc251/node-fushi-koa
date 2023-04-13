const { execute, executeTransaction } = require('../db/execute')

const HomeModels = require('../models/home')

class HomeService {
    static async getIconConfig () {
        return await execute(HomeModels.queryIconConfig, {})
    }
}

module.exports = HomeService