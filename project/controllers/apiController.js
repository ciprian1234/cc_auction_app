module.exports = function(app){

	app.get('/api', function(req, resp){
    	resp.redirect('home');
  	});

	app.get('/home', function(req, resp){
		resp.render("home");
	});

};