const FushiService = require('../service/fushiService')
const url = require("url");

class FushiController {

    static async getFushiRecord (ctx) {
        let params = url.parse(ctx.url, true).query
        let list = await FushiService.getList(params)
        if (list) {
            ctx.body = {
                code: 0,
                msg: 'success',
                data: list
            }
        } else {
            ctx.body = {
                code: 1001,
                msg: '请求错误'
            }
        }
    } 

    static async getFushiDetail (ctx) {
        let params = url.parse(ctx.url, true).query
        let data = await FushiService.getDetail(params)
        let collectState = await FushiService.getCollectState(params)
        if (data) {
            ctx.body = {
                code: 0,
                msg: 'success',
                data: {...data[0], ...{collectState: Boolean(collectState)}}
            }
        } else {
            ctx.body = {
                code: 1001,
                msg: '请求错误'
            }
        }
    }

    static async updateFushiCollect (ctx) {
        let params = url.parse(ctx.url, true).query
        let data = await FushiService.updateFushiCollect(params)

        if (data) {
            ctx.body = {
                code: 0,
                msg: 'success',
                data: data
            }
        } else {
            ctx.body = {
                code: 1001,
                msg: '请求错误'
            }
        }
    }

}

module.exports = FushiController