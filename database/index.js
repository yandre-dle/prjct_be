const mysql = require('mysql')

var db = mysql.createConnection({
    host: 'localhost',
    user: 'dle',
    password: 'abc12345',
    database: 'commerce',
    port: 3306
})

module.exports = db;