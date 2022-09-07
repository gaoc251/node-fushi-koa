const WechatUserUtil = require('../utils/WechatUserUtil');
const router = require('./main');
const userUtilMp = new WechatUserUtil();

router.get("/wxLogin", async (ctx, next) => {
    const {
        code,
        encryptedData,
        iv
    } = ctx.request.query

    let _wechatUserInfo
    // 获取微信用户信息
    let resData = await userUtilMp.getSessionKeyAndOpenId(code).then(e => {
        _wechatUserInfo = userUtilMp.getUserInfo(encryptedData, iv)
        return _wechatUserInfo
    })
    if (resData) {
        ctx.response.body = {
            msg: "登录成功",
            data: _wechatUserInfo
        }
    } else {
        ctx.response.body({
            msg: "授权失败",
            data: err
        })
    }
})