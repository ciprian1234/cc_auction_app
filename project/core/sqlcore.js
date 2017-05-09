var mysql = require('mysql');
var config = require('./config');
var SQL_POOL = mysql.createPool({
	connectionLimit : 3,
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
console.log("SQL core loaded, Created 3 SQL connections to %s",config.host);
module.exports = SQL_POOL;