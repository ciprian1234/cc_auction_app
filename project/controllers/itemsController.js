var bodyParser = require('body-parser');
// create application/json parser 
var jsonParser = bodyParser.json();
 // create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app, sql){

	app.get('/api/items', function(req, resp)
	{
		if(sql.connectionError === true){
			resp.sendStatus(500); 
			return;
		}

		var statement = 'SELECT * FROM items';
		sql.connection.query(statement, function(error, results, fields)
		{
			if(error){
				console.log(error);
				resp.sendStatus(500);
				return;
			}
			resp.send(results);
		});
	});

	app.get('/api/items/category/:category_id', function(req, resp){
		if(sql.connectionError === true){
			resp.sendStatus(500); 
			return;
		}

		var statement = 'SELECT * FROM items where category_id = ?';
		sql.connection.query(statement, [req.params.category_id], function(error, results, fields)
		{
			if(error){
				console.log(error);
				resp.sendStatus(500);
				return;
			}
			resp.send(results);
		});
	});

	app.get('/api/items/:queryString', function(req, resp){
		//TODO
		
	});

	app.post('/api/items', jsonParser, function(req, resp)
	{
		var statement = 'INSERT INTO items SET ?';
		var queryOutput = sql.connection.query(statement, req.body, function(error, results, fields){
			if(error){
				console.log("ERRO>>>>>><<<<");
				resp.sendStatus(500);
				return;
			}
			resp.send(fields);
		});
	});

	app.delete('/api/items/:name', function(req, resp){
		//
		
	});

};