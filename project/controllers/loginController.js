module.exports = function(app){

	app.get('/login', function(req, resp){
		resp.render("login");
	});

	app.post('/login', function(req, resp){

	});
};