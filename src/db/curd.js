/**
 * 查询操作
 * @param connection 连接
 * @param sql SQL语句
 * @param val SQL参数
 * @returns {Promise} resolve查询到的数据数组
 */
function query (connection, sql, val) {
    // console.info('sql执行query操作：\n', sql, '\n', val);
    return new Promise((resolve, reject) => {
        connection.query(sql, val, (err, rows) => {
            if (err) {
                console.error('sql执行失败！', sql, '\n', val);
                reject(err);
            } else {
                let results = JSON.parse(JSON.stringify(rows));
                resolve(results);
            }
        });
    });
}

/**
 * 查询单条数据操作
 * @param connection 连接
 * @param sql SQL语句
 * @param val SQL参数
 * @returns {Promise} resolve查询到的数据对象
 */
function queryOne (connection, sql, val) {
    return new Promise((resolve, reject) => {
        query(connection, sql, val).then(
            results => {
                let result = results.length > 0 ? results[0] : null;
                resolve(result);
            },
            err => reject(err)
        )
    });
}

/**
 * 新增数据操作
 * @param connection 连接
 * @param sql SQL语句
 * @param val SQL参数
 * @param {boolean} skipId 跳过自动添加ID, false: 自动添加id，true: 不添加id
 * @returns {Promise} resolve 自动生成的id
 */
function insert (connection, sql, val, skipId) {
    let id = val.id;
    if (!id && !skipId) {
        id = uuid();
        val = {id, ...val};
    }
    return new Promise((resolve, reject) => {
        // console.info('sql执行insert操作：\n', sql, '\n', val);
        connection.query(sql, val, (err, results) => {
            if (err) {
                console.error('sql执行失败！', sql, '\n', val);
                reject(err);
            } else {
                resolve(id);
            }
        });
    });
}

/**
 * 更新操作
 * @param connection 连接
 * @param sql SQL语句
 * @param val SQL参数
 * @returns {Promise} resolve 更新数据的行数
 */
function update (connection, sql, val) {
    // console.info('sql执行update操作：\n', sql, '\n', val);
    return new Promise((resolve, reject) => {
        connection.query(sql, val, (err, results) => {
            if (err) {
                console.error('sql执行失败！', sql, '\n', val);
                reject(err);
            } else {
                resolve(results.affectedRows);
            }
        });
    });
}

/**
 * 删除操作
 * @param connection 连接
 * @param sql SQL语句
 * @param val SQL参数
 * @returns {Promise} resolve 删除数据的行数
 */
function del (connection, sql, val) {
    // console.info('sql执行delete操作：\n', sql, '\n', val);
    return new Promise((resolve, reject) => {
        connection.query(sql, val, (err, results) => {
            if (err) {
                console.error('sql执行失败！', sql, '\n', val);
                reject(err);
            } else {
                // console.log('delete result', results);
                resolve(results.affectedRows);
            }
        });
    });
}

module.exports = {
    query
}

