var mysql = require('mysql');
var config = require('./config');
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

var connectionError = false;

connection.connect(function(error){
	if(error){
		connectionError = true;
		console.log("SQL connection ERROR!");
	}
	else{
		connectionError = false;
		console.log("Connected to google SQL server:%s", config.host);
	}
});

module.exports.connection = connection;
module.exports.connectionError = connectionError;