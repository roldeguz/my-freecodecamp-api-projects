// server.js
// roldeguz
// 22-June-2017
// freecodecamp API projects: timestamp microservice

// init project
var express = require('express');
var dateformat = require('dateformat');
var app = express();

var ds = null; // natural language date
var us = null; // unix timestamp
var valid; // used for validation

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// route when there's a parameter passed
app.get("/:ts", function (request, response) {
  var ts = request.params.ts;
  
  if (isNaN(ts)) {
    valid = (new Date(ts)).getTime() > 0;
    
    if (valid) {
      ds = ts;
      us = parseInt((new Date(ts).getTime() / 1000).toFixed(0));           
    }
  } else {    
     ds = dateformat(new Date(ts * 1000), "mmmm dd, yyyy");
     us = ts;          
  }
  
  var result = {"unix": us, "natural": ds};
  response.end(JSON.stringify(result));  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
