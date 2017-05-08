module.exports = function(app){

	app.get('/', function(req, resp){
    	resp.redirect('home');
  	});

	app.get('/home', function(req, resp){
		resp.render("home");
	});

};