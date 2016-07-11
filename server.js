var express = require('express');
var app = express();

app.use(express.static('static'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
    res.sendFile("static/index.html", {"root": __dirname});
});

var server = app.listen(8081, function () {
    console.log("Server listening at http://localhost:8081");
});