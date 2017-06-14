var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();
    bookRouter.route("/")
        .post(function (req, res) {
            var book = new Book(req.body);
            book.save();
            res.status(201).send(book);

        })
        .get(function (req, res) {
            var query = req.query;
            Book.find(query, function (err, books) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            });

        });

    bookRouter.route('/:bookId')
        .all(function (req, res, next) {
            Book.findById(req.params.bookId, function (err, book) {
                if (err) {
                    res.status(500).send(err);
                } else if (book) {
                    req.book = book;
                    next();
                } else {
                    res.status(404).send("Book Not Found");
                }
            });
        })
        .get(function (req, res) {
            res.json(req.book);

        })
        .put(function (req, res) {
            var book = req.book;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(book);
                }
            });

        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            var book = req.book;
            for (var p in req.body) {
                book[p] = req.body[p];
            }
            book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(book);
                }
            });

        })
        .delete(function(req, res) {
            req.book.remove(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    console.log("Deleted");
                    res.status(204).send("Book Deleted");
                }
            });
        });

    return bookRouter;
}

module.exports = routes;

