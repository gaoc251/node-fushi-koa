const pool = require('./pool')

// 获取连接
function getConnection () {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('获取数据库连接失败！', err)
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

// 开始数据库事务
function beginTransaction (connection) {
    return new Promise((resolve, reject) => {
        connection.beginTransaction(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// 提交数据库操作
function commit (connection) {
    return new Promise((resolve, reject) => {
        connection.commit(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

// 回滚数据库操作
function rollback (connection) {
    return new Promise((resolve, reject) => {
        connection.rollback(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

/**
 * 执行数据库操作【适用于不需要事务的查询以及单条的增、删、改操作】
 * 示例：
 * let func = async function(conn, projectId, memberId) { ... };
 * await execute( func, projectId, memberId);
 * @param func 具体的数据库操作异步方法（第一个参数必须为数据库连接对象connection）
 * @param params func方法的参数（不包含第一个参数 connection）
 * @returns {Promise.<*>} func方法执行后的返回值
 */
async function execute (func, ...params) {
    let connection = null;
    try {
        connection = await getConnection()
        let result = await func(connection, ...params);
        return result
    } finally {
        connection && connection.release && connection.release();
    }
}

/**
 * 执行数据库事务操作【适用于增、删、改多个操作的执行，如果中间数据操作出现异常则之前的数据库操作全部回滚】
 * 示例：
 * let func = async function(conn) { ... };
 * await executeTransaction(func);
 * @param func 具体的数据库操作异步方法（第一个参数必须为数据库连接对象connection）
 * @returns {Promise.<*>} func方法执行后的返回值
 */
async function executeTransaction(func) {
    const connection = await getConnection();
    await beginTransaction(connection);

    let result = null;
    try {
        result = await func(connection);
        await commit(connection);
        return result
    } catch (err) {
        console.error('事务执行失败，操作回滚');
        await rollback(connection);
        throw err;
    } finally {
        connection && connection.release && connection.release();
    }
}

module.exports ={
    execute,
    executeTransaction
}

