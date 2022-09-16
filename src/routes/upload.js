const formidable = require('koa-formidable'); // 图片处理
const router = require('./main')

const fs = require('fs'); // 图片路径
const path = require('path'); // 图片路径
const { resolve } = require('path');


// 新建文件，可以去百度fs模块
let mkdirs = (dirname, callback)=> {
    fs.access(dirname, fs.constants.F_OK, (err) => {
        console.log("err", dirname, err)
        if (err) { // 文件不存在
            mkdirs(path.dirname(dirname), function() {
                fs.mkdir(dirname, callback);
            });
        } else {
            callback();
        }
    })
    // fs.access(dirname, function(exists) {
    //     if (exists) {
    //         callback();
    //     } else {
    //         console.log("dirname", dirname)
    //         mkdirs(path.dirname(dirname), function() {
    //             fs.mkdir(dirname, callback);
    //         });
    //     }
    // });
};

router.post('/upload/image', async (ctx, next) => {
    // let form = formidable.parse(ctx.request);
    // console.log("ctx.request", ctx.request.body)
    // function formImage() {
    // 	return new Promise((resolve, reject) => {
    //         console.log("form", form)
    // 		form((opt, {fields, files})=> {
    //             // let url = fields.url;
    //             // let articleId = fields.articleId;
    //             let filename = files.file.name;
    //             console.log(files.file.path);
    //             let uploadDir = 'public/upload/';
    //                 let avatarName = Date.now() + '_' + filename;
    //                 mkdirs('public/upload', function() {
    //                     fs.renameSync(files.file.path, uploadDir + avatarName); //重命名
    //                     resolve(config[env].host + '/' + uploadDir + avatarName)
    //                     // http://localhost:6001/public/upload/1513523744257_WX20171205-150757.png
    //                 })
    //         })
    // 	})
    // }
    // let url = await formImage();
    // console.log("url", url)
    // return {flag: '1',msg:'',data: url} // 路径返回给前端

    // 方法2
    // const body = ctx.request.body
    // const basename = path.basename(body.filePath)
    // ctx.body =  {
    //     url: `${ctx.origin}/pubilc/uploads/${basename}`
    // }
    // console.log("ctx.body", ctx.body)

    function formImage() {
    	return new Promise((resolve, reject) => {
            const body = ctx.request.body
            const basename = path.basename(body.filePath)
            let uploadDir = 'public/uploads/';
            mkdirs('public/uploads', function() {
                resolve(ctx.origin + '/' + uploadDir + basename)
                // http://localhost:6001/public/upload/1513523744257_WX20171205-150757.png
            })
    	})
    }
    let url = await formImage();
    console.log("url", url)
    ctx.body = url // 路径返回给前端

});

router.get('/public/uploads', async(ctx, next) => {
    ctx.body = {
        msg: 1
    }
})
