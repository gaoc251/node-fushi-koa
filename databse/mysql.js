const mysql = require('mysql'); // 引入数据库

const { MYSQL_CONF } = require('../config/db')

// 创建连接对象
const connection = mysql.createConnection
({
  ...MYSQL_CONF
});

connection.connect(); // 打开连接

// 添加执行 sql 函数
function exec (sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}