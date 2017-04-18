
var express = require('express');
var app = express();

/* for using .env, we can preload but i'm keeping here as reminder */
var dotenv = require('dotenv');
dotenv.load();

// --> 7)  Mount the Logger middleware here
app.use(function(req, res, next){
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// --> 11)  Mount the body-parser middleware  here
var bodyParser = require('body-parser');
bodyParser.urlencoded({ extended: false });

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.listen(process.env.PORT || 3000 ); 
console.log('Express server listening on port ' + (process.env.PORT || 3000));

/** Serve an HTML file */
app.get('/', function(req, res){
  var absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});


/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */
/*
app.get('/json', function(req, res){
  res.json({ "message": "Hello json" });
});
*/

/** 6) Use the .env file to configure the app */
app.get('/json', function(req, res){
  var message = 'Hello json';
  if(process.env.MESSAGE_STYLE === 'uppercase'){
    message = message.toUpperCase();
  }
  
  res.json({ "message": message });
});
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res){
  res.json({ time: req.time });
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req, res){
  res.json({ echo: req.params.word });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name').get(function(req, res){
  res.json({ name: req.query.first + ' ' + req.query.last });
}).post();
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
