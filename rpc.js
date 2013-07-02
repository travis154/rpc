var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , dnode = require('dnode')
var app = express();
var client;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.compress());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/:cmd/:arg', function(req,res){
	var cmd = req.params.cmd;
	var arg = req.params.arg;
	if(arg){
		arg = decodeURIComponent(arg);
	}
	if(typeof c[cmd] == 'undefined'){
		return res.json({error:"invalid command"});
	}
	c[cmd](arg, function(t){
		res.json(t);
	});
});

var c;
dnode(function (client) {
	c = client;
}).listen(6000);

http.createServer(app).listen(3019);
