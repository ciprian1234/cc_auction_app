'use strict';
/* Dependencies */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
/* TODO: add passport authentification */


/* Init */
var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

/* MiddleWare use */
app.use("public", express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy( function(username, password, done){

	// TODO: db interogation
	if(username === password) {
		done(null, { name: username, info: "get from DB"});
	}
	else {
		done(null, null); // bad login details
	}
}));




//register controllers
var homeController = require("./controllers/homeController");
var loginController = require("./controllers/loginController");
var registerController = require("./controllers/registerController");
var itemsController = require("./controllers/itemsController");

//connect to database
var sql = require("./core/sqlcore");

homeController(app, sql);
loginController(app, sql);
registerController(app, sql);
itemsController(app, sql);

/* Listener */
var app_port = process.env.PORT || 3000;
app.listen(app_port, function(){
  console.log("App listening on port %s", app_port);
});

/* Start Web Apps */
//var auctionApp = require('./auctionApp');
//auctionApp(app);
