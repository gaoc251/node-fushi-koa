const CommonService = require('../service/commonService')
const WechatUserUtil = require('../utils/WechatUserUtil');
const userUtilMp = new WechatUserUtil();
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

    static async getOpenId (ctx, next) {
        const {
            code,
            encryptedData,
            iv
        } = ctx.request.query
    
        let _wechatUserInfo
        // 获取微信用户信息
        let resData = await userUtilMp.getSessionKeyAndOpenId(code).then(e => {
            _wechatUserInfo = userUtilMp.getUserInfo(encryptedData, iv, e)
            console.log("_wechatUserInfo", _wechatUserInfo)
            return _wechatUserInfo
        })
        if (resData) {
            ctx.response.body = {
                code: 0,
                msg: "登录成功",
                data: _wechatUserInfo
            }
        } else {
            ctx.response.body({
                code: '9999',
                msg: "授权失败",
                data: err
            })
        }
    }
}

module.exports = CommonController