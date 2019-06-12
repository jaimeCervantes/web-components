const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000 );

app.use( express.static( path.resolve( __dirname ) ) );

app.listen(app.get('port'), function(){
	console.log('Web server listening on port: ' + app.get('port') );
});