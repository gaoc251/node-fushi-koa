/**
 * 封装小程序用户信息类
 */
//  const request = require('request')
const CryptoJs = require('crypto-js')
const Base64 = require('js-base64')
const HttpUtil = require('../utils/HttpUtil')

class WechatUserUtil {
    constructor() {
        this.reqUrl = 'https://api.weixin.qq.com/sns/jscode2session'
        this.appid = 'wx35bea068bd43243b'
        this.secret = '361d38749fbe7f8d98b7d507229d8d93'
        this.grand_type = 'authorization_code'
        this.openId = null
        this.sessionKey = null
    }

    getOpenId() {
        return this.openId
    }

    getSessionKey() {
        return this.sessionKey
    }

    // 获取 openId 和 sessionKey
    getSessionKeyAndOpenId(code) {
        return new Promise((resolve, reject) => {
            let url = `${this.reqUrl}?appid=${this.appid}&secret=${this.secret}&js_code=${code}&grand_type=${this.grand_type}`
            console.log("url", url)

            let _sessionKey = null
            HttpUtil.get(url).then(res => {
                console.log("SessionKey & OpenId", res)
                let jsonBody = JSON.parse(res)
                this.openId = jsonBody.openid
                this.sessionKey = jsonBody.session_key
                resolve(this.sessionKey)
            })
        })
    }

    // 解密获取用户信息
    getUserInfo(encryptedData, ivv, sessionKey) {
        console.log("encryptedData", encryptedData)
        console.log("ivv", ivv)
        console.log("sessionKey", sessionKey)

        if (!sessionKey) {
            sessionKey = this.sessionKey
        }
        let key = CryptoJs.enc.Base64.parse(sessionKey)
        let iv = CryptoJs.enc.Base64.parse(ivv)
        let decrypt = CryptoJs.AES.decrypt(encryptedData, key, {
            iv,
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        })
        
        return JSON.parse(Base64.decode(CryptoJs.enc.Base64.stringify(decrypt)))
    }
}

module.exports = WechatUserUtil