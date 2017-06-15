var should = require('should');
var sinon = require('sinon');

describe('book controller tests', function() {
	describe('Post Tests', function() {
		it('should not allow an empty title on POST', function() {
			var Book = function(book) {this.save = function(){}}

			var req = {
				body: {
					author: 'My Author'
				}
			};

			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};
			
			var bookController = require('../controllers/bookController')(Book);
			bookController.post(req, res);
			res.status.calledWith(400).should.equal(true, 'Bad Status: '+res.status.args[0][0]);
			res.send.calledWith('Title Is Required').should.equal(true);
		})
	})
})
