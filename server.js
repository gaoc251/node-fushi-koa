const Koa = require('koa');

const app = new Koa(); // 初始化koa

const Router = require('koa-router') // 路由控制
const server = require('koa-static') // 静态资源支持库
const bodyParser = require('koa-bodyparser'); // 处理POST请求，请求报文的处理。
const router = new Router()

const path = require('path')

const cors = require('koa2-cors'); // 处理跨域

const mysql = require('mysql'); // 引入数据库

// 解析request的body
app.use(bodyParser());  

// 添加路由

// 根路由
router.get('/', async (ctx, next) => {
    ctx.body = '我是服务器，我可以处理很多请求，对应不同的路由';
});

router.get('/hello', async (ctx, next) => 
{
    ctx.body = 'Hello!';
});

// get 请求
router.get('/getData', async (ctx, next) => 
{
    // 获取路由
    let url = ctx.url;
    //  从上下文的request对象中获取
    let request = ctx.request;
    let req_query = request.query;
    let req_queryString = request.querystring;
    //  从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_queryString = ctx.querystring;
    // 显示
    console.log(url);
    console.log("req_query",req_query);
    console.log("req_queryString", req_queryString);
    console.log("ctx_query", ctx_query);
    console.log("ctx_queryString", ctx_queryString);
    // 发送数据
    ctx.response.body = JSON.stringify("我已收到消息");
});

// POST 请求
router.post('/postData', async (ctx, next) => {
    // 获取数据
    let ID = ctx.request.body.ID;
    let Name = ctx.request.body.Name;
    // 显示
    console.log("ID", ID);
    console.log("Name", Name);
    // 发送数据
    ctx.response.body = JSON.stringify("我已收到消息");
});

router.post('/selectData', async (ctx, next) => {
    // sql语句
    let sqlStr = `select * from user;`
    // 查询
    let res = await query(sqlStr);
    ctx.response.body = JSON.stringify(res);
});

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


app.use(cors()); // 跨域出路
app.use(bodyParser());	// POST
// 分配路由
app.use(router.routes())

app.listen(8080)
