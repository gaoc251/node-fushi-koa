const https = require('https')
const http = require('http')
require('request-to-curl')

// const baseDomain =  '127.0.0.1:8080'//"http://appwechat.service.58dns.org";

// const URLS = {
//     "houseList": `${baseDomain}/houselist/api_zufang_m_list`,//列表数据
//     "filterData": `${baseDomain}/houselist/api_zufang_m_filter`,//非列表数据
// }

class HttpUtil {

    // static URLS = URLS

    static async post(urlStr, body={}) {
        return new Promise((resolve, reject) => {
            let _url = new URL(urlStr);
            const reqClient = _url.protocol == "https:" ? https : http;
            const postBodyStr = JSON.stringify(body)
            let option = {
                method: "POST",
                protocol: _url.protocol,
                host: _url.hostname,
                port: _url.protocol == "https:" ? 443 : 80,
                path: `${_url.pathname}${_url.search}`,
                headers: {
                    "content-length": Buffer.byteLength(postBodyStr) + "",
                    "content-Type": "application/json",
                },
                timeout: 9000,
            }
            let req = reqClient.request(option, (res) => {
                let buf = Buffer.alloc(0);
                res.on("data", (chunk) => {
                    buf = Buffer.concat([buf, chunk], buf.length + chunk.length)
                })
                res.on("end", () => {
                    resolve(buf.toString())
                })
                res.on("error", (e) => {
                    reject(e)
                })
            })
            req.write(postBodyStr)
            req.on("timeout", (e) => {
                reject(e)
            })
            req.end();
        })
    }

    static async get(urlStr, param= {}, header) {
        return new Promise((resolve, reject) => {
            const _url = new URL(urlStr);
            const reqClient = _url.protocol == "https:" ? https : http;

            if (param) {
                for (var key in param) {
                    _url.searchParams.set(key, param[key]);
                }
            }
            const option = {
                method: "GET",
                protocol: _url.protocol,
                host: _url.hostname,
                port: _url.protocol == "https:" ? 443 : 80,
                path: `${_url.pathname}${_url.search}`,
                headers: header ? {
                    "cookie": header.cookie ? header.cookie : "",
                    "user-agent": header['user-agent'] ? header['user-agent'] : "",
                    "referer": header['referer'] ? header['referer'] : ""
                } : {},
                timeout: 9000,
            }
            const req = reqClient.request(option, (res) => {
                //@ts-ignore
                console.log("req.toCurl()", req.toCurl());
                let buf = Buffer.alloc(0);
                res.on("data", (chunk) => {
                    buf = Buffer.concat([buf, chunk], buf.length + chunk.length)
                })
                res.on("end", () => {
                    resolve(buf.toString())
                })
                res.on("error", (e) => {
                    reject("err" + e)
                })
            })
            req.on("timeout", (e) => {
                reject('timeout')
            })
            req.end();
        })
    }
}

module.exports = HttpUtil;
