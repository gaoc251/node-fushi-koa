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
}

module.exports = HomeController