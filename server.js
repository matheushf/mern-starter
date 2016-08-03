var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;

var app = express();
var db;

app.use(express.static('static'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile("static/index.html", {"root": __dirname});
});

var bugData = [
    {id: 1, status: "Active", priority: 'High', owner: 'My', title: 'Nothing'},
    {id: 2, status: "Active", priority: 'High', owner: 'My', title: 'Nothing'}
];

app.get('/api/bugs', function (req, res) {
    db.collection("bugs").find().toArray(function (err, docs) {
        res.json(docs);
    });
});

app.post('/api/bugs', function (req, res) {
    console.log("Req body:", req.body);
    var newBug = req.body;
    db.collection("bugs").insertOne(newBug, function (err, result) {
        var newId = result.insertedId;
        db.collection("bugs").find({
            _id: newId
        }).next(function (err, doc) {
            res.json(doc);
        });
    });
});

mongoClient.connect('mongodb://localhost/bugsdb', function (err, dbConnection) {
    db = dbConnection;
    var server = app.listen(8081, function () {
        var port = server.address().port;
        console.log("Server listening at http://localhost:8081");
    });
});