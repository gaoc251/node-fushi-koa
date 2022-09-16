const router = require('./main')
const multer = require('@koa/multer');
const fs = require('fs');
const path = require('path');


//配置    
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        console.log("dest", file)
        cb(null, 'public/uploads/')  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        console.log("filename", file)
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
// //加载配置
var upload = multer({ storage: storage })

router.post('/upload/img', upload.single('file'), async (ctx, next) => {
    console.log("ctx.req.body", ctx.request.body) 
    
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

