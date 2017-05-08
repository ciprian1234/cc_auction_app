module.exports = function(app){

	app.get('/register', function(req, resp){
		resp.render("register");
	});

};