const { execute, executeTransaction } = require('../db/execute')

const CommonModels = require('../models/common')

class CommonService {
    static async uploadImg () {
        return await execute(CommonModels.insertUploadImg, {})
    }

    static async saveFushiRecord (params) {
        // console.log("保存params", params)
        return await execute(CommonModels.addFushiRecord, params)
    }
}

module.exports = CommonService