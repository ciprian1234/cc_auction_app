var SQL_POOL = require('../core/sqlcore'); //get SQL connections
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); // create application/json parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });  // create application/x-www-form-urlencoded parser 

module.exports = function(app){



	/* GET /api/users - return all users from database */
	app.get('/api/users', function(req, resp)
	{
		var statement = 'SELECT * FROM users';
		SQL_POOL.query(statement, function(error, results, fields)
		{
			if(error){
				console.log(error);
				resp.status(500);
				resp.send({error: "Error: GET /api/users"});
				return;
			}
			resp.send(results);
		});
	});



	/* GET /api/users/:username - return user with specific username */
	app.get('/api/users/:username', function(req, resp)
	{
		var statement = 'SELECT * FROM users WHERE username = ?';
		SQL_POOL.query(statement, [req.params.username], function(error, results, fields)
		{
			if(error){
				console.log(error);
				resp.status(500);
				resp.send({error: "Error: GET /api/users/:username"});
				return;
			}
			resp.send(results);
		});
	});



	/* GET /api/users/:username/items - returneaza itemurile unui user */
	app.get('/api/users/:username/items', function(req, resp)
	{
		var statement = 'SELECT * FROM items WHERE username = ?';
		SQL_POOL.query(statement, [req.params.username], function(error, results, fields)
		{
			if(error){
				console.log(error);
				resp.status(500);
				resp.send({error: "Error: GET /api/users/:username/items"});
				return;
			}
			resp.send(results);
		});
	});



	/* GET /api/users/:username/bids - returneaza bid-urile unui user */
	app.get('/api/users/:username/bids', function(req, resp)
	{
		var statement = 'SELECT * FROM bids WHERE username = ?';
		SQL_POOL.query(statement, [req.params.username], function(error, results, fields)
		{
			if(error){
				console.log(error);
				resp.status(500);
				resp.send({error: "Error: GET /api/users/:username/bids"});
				return;
			}
			resp.send(results);
		});
	});



	/* POST /api/users - inregistreaza userul in baza de date */
	app.post('/api/users', jsonParser, function(req, resp)
	{
		//check if username is already taken
		var usernameIsTaken = 0;
		var queryOutput = SQL_POOL.query('SELECT * FROM users WHERE username = ?', [req.body.username], 
		function(error, results, fields){
			if(error)
			{
				console.log(error);
				resp.status(500);
				resp.send({error: "ServerError: POST /api/users"});
			}
			usernameIsTaken = results.length;
		});

		if(usernameIsTaken !== 0){
			resp.send({error: util.format("Username %s is already taken", req.body.username)});
			return;
		}


		//If everything is ok
		var queryOutput = SQL_POOL.query('INSERT INTO users SET ?', req.body, function(error, results, fields)
		{
			if(error){
				console.log("LOG: **%s**\n", error);
				resp.status(500);
				resp.send({error: "Error: POST /api/users"});
				return;
			}
		});

		resp.send(queryOutput.values);
	});


};