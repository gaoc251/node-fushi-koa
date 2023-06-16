let MYSQL_CONF = {
    host     : 'localhost',
    user     : 'root',
    password : '37963221', // 你的MySQL数据库root密码
    database : 'fushi-records',	// 要连接的数据库名
    connectionLimit: 50, // 连接池允许创建的最大连接数
    queueLimit: 0 // 允许挂起的最大连接数
}
module.exports = {
    MYSQL_CONF
}
