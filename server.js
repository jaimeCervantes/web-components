var express = require('express');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 5000 );

app.use( express.static( path.resolve( __dirname ) ) );

app.listen(app.get('port'), function(){
	console.log('Web server listening on port: ' + app.get('port') );
});