const CommonService = require('../service/commonService')

class CommonController {
    static async uploadImg (ctx) {
        let imgList = await CommonService.uploadImg(ctx.request.body, ctx.request.url)
        console.log("imgList", imgList)
        if (imgList) {
            ctx.body = {
                code: 0,
                msg: 'success',
                data: imgList
            }
        } else {
            ctx.body = {
                code: 1001,
                msg: '请求错误'
            }
        }
    }

    static async saveFushiRecord (ctx, next) {
        let record = await CommonService.saveFushiRecord(ctx.request.body, ctx.request.url)
        console.log("record", record)
        if (record) {
            ctx.body = {
                code: 0,
                msg: 'success',
                data: {}
            }
        } else {
            ctx.body = {
                code: 1001,
                msg: '请求错误'
            }
        }
    }
}

module.exports = CommonController