var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var mongoose = require('mongoose');
// var articleModel = require('../models/article');
var article = mongoose.model('article');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function (passport) {

	/* GET new article page */
	router.get('/new', isAuthenticated, function (req, res) {
		res.render('new', {
			title: 'New article',
			user: req.user
		});
	});

	/* POST new article */
	router.post('/new', isAuthenticated, function (req, res) {
		var data = req.body;
		var newArticle = new article(data);

		newArticle.save(function (err, data) {
			if (err) {
				console.log('err:', err);
			} else {
				console.log('saved:', data);
				// TODO prompt user to confirm article before redirect to start
				res.redirect('/', {user: req.user});
			}
		});
		// res.sendStatus(200);
	});

	/* GET single article page */
	router.get('/:id', function(req, res, next) {
		var id = req.params.id;

		article.findById(id, function (err, single) {
			res.render('article', {
				single: single,
				user: req.user
			});
		});
	});

	return router;
}

// module.exports = router;
