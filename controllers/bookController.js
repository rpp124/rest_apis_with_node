var bookController = function (Book) {
	var post = function (req, res) {
		var book = new Book(req.body);
		if (!req.body.title) {
			res.status(400);
			res.send('Title Is Required');
		} else {
			book.save();
			res.status(201);
			res.send(book);
		}

	};

	var get = function (req, res) {
		var query = req.query;
		Book.find(query, function (err, books) {
			if (err) {
				res.status(500).send(err);
			} else {
				var returnBooks = [];
				books.forEach(function (element, index, array) {
					var book = element.toJSON();
					book.links = {};
					book.links.self = 'http://' + req.headers.host + '/api/books/' + book._id;
					returnBooks.push(book);
				})

			}
			res.json(returnBooks);
		});

	};

	return {
		post: post,
		get: get
	}
};

module.exports = bookController;
