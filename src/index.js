const Koa = require('koa');

const router = require('./routes/main')
const cors = require('koa2-cors'); // 处理跨域
const bodyParser = require('koa-bodyparser'); // 处理POST请求，请求报文的处理。
const serve = require("koa-static");
const koaBody = require('koa-body')
const path = require('path')
const App = new Koa();
const fs = require('fs')

require('./routes/test')
require('./routes/database') // 测试数据库
require('./routes/user') // 微信登录

const { saveImage } = require('./../controller/uploadImageController')
const {upload} = require('./routes/uploads');

router.post('/upload/img', upload.single('file'), async (ctx, next) => {

    const data = await saveImage(ctx.request.body, ctx.request.url);

    console.log("data", data)
    
    ctx.body = {
        filename: ctx.request.body.files, 
        body: ctx.req.body,
        code: 0,
        data: {
            fileUrl: ctx.request.body.files //返回文件名  
        },
        message: 'success'
    }
});

// router.get('/public/uploads/:image*', function(ctx, res) {
//     console.log("req", ctx.request.url)
//     let filePath = path.join(__dirname, `../${ctx.request.url}`)
//     let file = fs.readFileSync(filePath)
//     ctx.body = file
// })

// 首页接口
// const HomeController = require('../src/controller/homeController')
// router.get('/iconConfig', HomeController.getIconConfig)
// router.get('/getRecommedList', HomeController.getRecommendList)
// router.get('/getPintuanList', HomeController.getPintuanList)

// 个人接口

// 上传接口
const CommonController = require('./controller/commonController ')
router.post('/uploadImg', upload.single('file'), CommonController.uploadImg) // 暂时未用
router.get('/getOpenId', CommonController.getOpenId)
router.post('/saveFushiRecord', CommonController.saveFushiRecord)

// 查询辅食列表数据
const FushiController = require('./controller/fushiController')
router.get('/getFushiRecord', FushiController.getFushiRecord)
router.get('/getFushiDetail', FushiController.getFushiDetail)
router.get('/updateFushiCollect', FushiController.updateFushiCollect)





App.use(cors()); // 跨域出路
App.use(bodyParser());	// POST
// 开始使用路由
App.use(router.routes())
// App.use(serve(__dirname))  // 设置静态文件
App.use(serve(path.join(__dirname, '/public')))  // 设置静态文件
App.use(router.allowedMethods())
// App.use(koaBody({
//     // enableTypes: ['json', 'form', 'text'],
//     multipart: true,
//     formidable: {
//         maxFieldsSize: 2*1024*1024
//     }
// }))

App.listen(8080)