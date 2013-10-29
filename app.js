var express = require('express')
  , module = require('module')
  , http = require('http')
  , path = require('path');


// the ExpressJS App
var app = express();

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.
app.configure(function(){

  // server port number
  app.set('port', process.env.PORT || 5000);

  //  templates directory to 'views'
  var filename = module.uri;
  app.set('views', path.dirname(filename) + '/views');

  // // setup template engine - we're using Hogan-Express
  app.set('view engine', 'html');
  app.set('layout','layout');
  app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express
  
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.static(__dirname + '/static'));

  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// ROUTES
app.get('/', function(req, res){

  var templateData = {
    name : 'Ben',
    colors : ['red','blue','green']
  }

  res.render('index.html', templateData);


}); //main page


app.get('/page2', function(req, res){
  
  res.send('welcome to page 2, ' + req.query.name);
});




app.listen(app.get('port'));
console.log("Server running on port: " + app.get('port'));