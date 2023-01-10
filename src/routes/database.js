const router = require('./main')
router.post('/selectData', async (ctx, next) => {
    console.log("ctx11111")
    // sql语句
    let sqlStr = `select * from shops;`
    // 查询
    let res = await query(sqlStr);
    ctx.response.body = JSON.stringify(res);
});