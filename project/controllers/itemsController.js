var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); // create application/json parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });  // create application/x-www-form-urlencoded parser 

//get SQL connections
var SQL_POOL = require('../core/sqlcore');

module.exports = function(app){


	/* GET /api/items - return all existing items from database */
	app.get('/api/items', function(req, resp)
	{
		var statement = 'SELECT * FROM items';
		SQL_POOL.query(statement, function(error, results, fields)
		{
			if(error){
				console.log("LOG: **%s**\n", error);
				resp.status(500);
				resp.send({error: "Error: GET /api/items"});
				return;
			}
			resp.send(results);
		});
	});



	/* GET /api/items/:item_id - return a specific item from database */
	app.get('/api/items/:item_id', function(req, resp){

		var statement = 'SELECT * FROM items WHERE item_id = ?';
		SQL_POOL.query(statement, [req.params.item_id], function(error, results, fields)
		{
			if(error){
				console.log("LOG: **%s**\n", error);
				resp.status(500);
				resp.send({error: "Error: GET /api/items/:item_id"});
				return;
			}
			resp.send(results);
		});
	});



	/* GET /api/categories - return all categories */
	app.get('/api/categories', function(req, resp){

		var statement = 'SELECT * FROM categories';
		SQL_POOL.query(statement, function(error, results, fields)
		{
			if(error){
				console.log("LOG: **%s**\n", error);
				resp.status(500);
				resp.send({error: "Error: GET /api/categories"});
				return;
			}
			resp.send(results);
		});
	});




	/* GET /api/items/categories/:category_id - return all items from a specific category */
	app.get('/api/items/categories/:category_id', function(req, resp){

		var statement = 'SELECT * FROM items WHERE category_id = ?';
		SQL_POOL.query(statement, [req.params.category_id], function(error, results, fields)
		{
			if(error){
				console.log("LOG: **%s**\n", error);
				resp.status(500);
				resp.send({error: "Error: GET /api/items/categories/:category_id"});
				return;
			}
			resp.send(results);
		});
	});



	/* GET /api/items/:item_id/bids - return all bids from a specific item */
	app.get('/api/items/:item_id/bids', function(req, resp){

		var statement = 'SELECT * FROM bids WHERE item_id = ?';
		SQL_POOL.query(statement, [req.params.item_id], function(error, results, fields)
		{
			if(error){
				console.log("LOG: **%s**\n", error);
				resp.status(500);
				resp.send({error: "Error: GET /api/items/:item_id/bids"});
				return;
			}
			resp.send(results);
		});
	});


	//TODO
	/*app.post('/api/items/query', function(req, resp){
	});*/


	


	/* POST /api/items/bids - create an item */
	app.post('/api/items', jsonParser, function(req, resp)
	{
		var statement = 'INSERT INTO items SET ?';
		var queryOutput = SQL_POOL.query(statement, req.body, function(error, results, fields){
			if(error){
				console.log("LOG: **%s**\n", error);
				resp.status(500);
				resp.send({error: "Error: POST /api/items"});
				return;
			}
			resp.send(queryOutput.values);
		});
	});


	/* POST /api/items/bids - create bid for an item */
	app.post('/api/items/bids', jsonParser, function(req, resp)
	{
		var statement = 'INSERT INTO bids SET ?';
		var queryOutput = SQL_POOL.query(statement, req.body, function(error, results, fields){
			if(error){
				console.log("LOG: **%s**\n", error);
				resp.status(500);
				resp.send({error: "Error: POST /api/items/bids"});
				return;
			}
			resp.send(queryOutput.values);
		});
	});



	app.delete('/api/items/:item_id', function(req, resp){
		//
		
	});



	app.delete('/api/bids/:bid_id', function(req, resp){
		//
		
	});

};