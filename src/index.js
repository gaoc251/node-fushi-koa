const Koa = require('koa');

const router = require('./routes/main')
const cors = require('koa2-cors'); // 处理跨域
const bodyParser = require('koa-bodyparser'); // 处理POST请求，请求报文的处理。
const mysql = require('mysql'); // 引入数据库
const serve = require("koa-static");
const koaBody = require('koa-body')
const path = require('path')
const App = new Koa();

require('./routes/test')
require('./routes/database') // 测试数据库
require('./routes/user') // 微信登录
require('./routes/upload') // 图片上传
require('./routes/uploads')

// 创建连接
const connection = mysql.createConnection
({
  host     : 'localhost',
  user     : 'root',
  password : '123456', // 你的MySQL数据库root密码
  database : 'user'	// 要连接的数据库名
});

connection.connect(); // 打开连接
query= function(sql, parmas=null){
    return new Promise(function(reject,resolve)
    {        
        //执行sql语句
        connection.query(sql, parmas, function (error, results, fields) {
            if (error) 
            {
                throw error;
            }
            reject(results);  // 注意是reject   
        });
        // 提交
        connection.commit();
    })
}

App.use(cors()); // 跨域出路
App.use(bodyParser());	// POST
// 开始使用路由
App.use(router.routes())
// App.use(serve(__dirname))  // 设置静态文件
App.use(serve(path.join(__dirname, '/public')))  // 设置静态文件

App.use(koaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 2*1024*1024
    }
}))

App.listen(8080)