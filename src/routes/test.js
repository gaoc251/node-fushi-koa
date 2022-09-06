const router = require('./main')

// 根路由
router.get('/', async (ctx, next) => {
    ctx.body = '我是服务器，我可以处理很多请求，对应不同的路由';
});

router.get('/hello', async (ctx, next) => 
{
    ctx.body = 'Hello!';
});

// get 请求
router.get('/getData', async (ctx, next) => {
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