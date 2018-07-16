var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

var playlist = require('./routes/playlist');
var auth = require('./routes/auth')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')).use(cookieParser());

app.use('/api/playlist', playlist);
app.use('/api/auth', auth);

app.listen(8080, () => console.log('Example app listening on port 3000!'))
