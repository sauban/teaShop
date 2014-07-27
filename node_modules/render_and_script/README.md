renderAndScript
================

[express.js plugin] render view and run client side js on server.

# install
```
npm install render_and_script
```

# how to use
## app.js
Add "app.use(renderAndScript)" to configure.

```javascript

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var renderAndScript = require(__dirname);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(renderAndScript);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

```

## route
Instead of "res.render", use "res.renderAndScript".

```javascript
exports.index = function(req, res){
	res.renderAndScript(
		'index',
		{ title: 'Express' },
		function (window, callback) {
			window.document.body.innerHTML = 'scriped..';
			callback();
		}
	);
};
```

This responce with the html which is rendered and processed by script.
