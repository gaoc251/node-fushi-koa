const { execute, executeTransaction } = require('../db/execute')

const CommonModels = require('../models/common')

class CommonService {
    static async uploadImg () {
        return await execute(CommonModels.insertUploadImg, {})
    }
}

module.exports = CommonService