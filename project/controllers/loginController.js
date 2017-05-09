var bodyParser = require('body-parser');
var crypto = require('crypto')
// create application/json parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app, sql){
	
	app.post('/api/login',urlencodedParser, function(req, resp){
		if (!req.body) return res.sendStatus(400)
        
        if(sql.connectionError === true){
			resp.sendStatus(500); 
			return;
		}
        
        var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
        //console.log(req.body.password)
        
        var statement = 'SELECT type FROM users where username = ? and password = ?';
        sql.connection.query(statement, [req.body.username, req.body.password], function(error, results, fields)
		{
			if(error){
				console.log(error);
				resp.sendStatus(500);
				return;
			}
            resp.send(results)
           
		});
        //resp.sendStatus(201);
	});
};