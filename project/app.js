'use strict';
/* Dependencies */
var express = require('express');
var bodyParser = require('body-parser');

/* Init */
var app_port = 3000;
var app = express();

/* config */
app.set('view engine', 'ejs');
app.set('views', __dirname+'/public');
app.use(express.static('public'));
app.use( bodyParser.urlencoded({extended: false}) );

/* Listener */
var server = app.listen(process.env.PORT || app_port, function(){
  console.log("App listening on port %s", server.address().port);
});

/* Start Web App */
var auctionApp = require('./auction_app');
auctionApp(app);
