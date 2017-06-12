var express = require('express');
var app = express();
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/booksApi');
var Book = require('./model/bookModel');

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route("/books")
	.get(function (req, res) {
		var query = req.query;
		Book.find(query, function (err, books) {
			if (err) {
				res.status(500).statusMessage(err);
			} else {
				res.json(books);
			}
		});

	});

bookRouter.route('/books/:bookId')
	.get(function (req, res) {
		
		Book.findById(req.params.bookId, function (err, books) {
			if (err) {
				res.status(500).statusMessage(err);
			} else {
				res.json(books);
			}
		});
	});

app.use('/api', bookRouter);

app.get('/', function (req, res) {
	res.send("Welcome");

});
app.listen(port, function () {
	console.log("App Listening on port: " + port);
})
