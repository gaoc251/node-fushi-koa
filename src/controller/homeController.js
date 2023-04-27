const HomeService = require('../service/homeService')

class HomeController {
    static async getIconConfig (ctx) {
        let iconConfig = await HomeService.getIconConfig()
        if (iconConfig) {
            ctx.body = {
                code: 0,
                msg: 'success',
                data: iconConfig
            }
        } else {
            ctx.body = {
                code: 1001,
                msg: '请求错误'
            }
        }
    }

    static async getRecommendList (ctx) {
        let recommendList = await HomeService.getRecommendList()
        if (recommendList) {
            ctx.body = {
                code: 0,
                msg: 'success',
                data: recommendList
            }
        } else {
            ctx.body = {
                code: 1001,
                msg: '请求错误'
            }
        }
    } 

    static async getPintuanList (ctx) {
        let pintuanList = await HomeService.getPintuanList ()
        if (pintuanList) {
            ctx.body = {
                code: 0,
                msg: 'success',
                data: pintuanList
            }
        } else {
            ctx.body = {
                code: 1001,
                msg: '请求错误'
            }
        }
    }
}

module.exports = HomeController