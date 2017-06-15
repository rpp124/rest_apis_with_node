var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;
if(process.env.ENV==='Test') {
	var db = mongoose.connect('mongodb://localhost:27017/booksApi_Test');
} else {
	var db = mongoose.connect('mongodb://localhost:27017/booksApi');
}
var Book = require('./model/bookModel');

var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
	res.send("Welcome");

});
app.listen(port, function () {
	console.log("App Listening on port: " + port);
})


module.exports = app;
