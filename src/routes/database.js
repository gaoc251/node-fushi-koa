const router = require('./main')
router.post('/selectData', async (ctx, next) => {
    // sql语句
    let sqlStr = `select * from user;`
    // 查询
    let res = await query(sqlStr);
    ctx.response.body = JSON.stringify(res);
});