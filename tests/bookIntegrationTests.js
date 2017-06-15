var should = require('should');
var request = require('supertest');
var app = require('../app');
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var agent = request.agent(app);

describe('Book CRUD Tests', function() {
	it('should allow a book to be posted and return a read and _id', function(done) {
		var newBook = {title: "My New Book", author: "Rick P", genre: "Awesome"};

		agent.post('/api/books').send(newBook).expect(200).end(function(err, results) {
			results.body.read.should.equal(false);
			results.body.should.have.property('_id');
			done();
		})
	});
	afterEach(function(done) {
		Book.remove().exec();
		done();
	});
})
