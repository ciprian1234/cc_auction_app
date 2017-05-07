'use strict';
/* Dependencies */
var express = require('express');

/* Init */
var app = express();

/* config */
//To add

/* Listener */
var server = app.listen(process.env.PORT || 3000, function(){
  console.log("App listening on port %s", server.address().port);
});

/* App */
app.get("/", function(req, resp){
  resp.send("Server is working");
});
