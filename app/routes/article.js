var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var articleModel = require('../models/article');
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
	router.post('/new', function (req, res) {
		var newArticle = new article(req.body);

		newArticle.save(function (err) {
			if (err) {
				console.log('err:', err);
			} else {
				// Redirect to start page
				res.redirect('/');
			}
		});
	});

	/* GET single article page */
	router.get('/:id', function(req, res, next) {
		var id = req.params.id;

		article.findById(id).populate('author').exec(function (err, single) {
			res.render('article', {
				title: single.title,
				single: single,
				user: req.user,
				url: req.originalUrl
			});
		});
	});

	/* GET edit article page */
	router.get('/edit/:id', function (req, res) {
		var id = req.params.id;
		article.findById(id).exec(function (err, single) {
			res.render('edit', {
				title: 'Edit article',
				single: single,
				user: req.user
			});
		});
	});

	/* UPDATE article */
	router.post('/edit/:id', function (req, res) {
		var id = req.params.id;
		// Find article by id and update model
		article.update({_id: id}, {$set: req.body}, function (err) {
			if (err) {
				res.sendStatus(304);
			} else {
				// Redirect to article page
				res.redirect('/article/' + id);
			}
		});
	});

	/* DELETE article */
	router.delete('/:id', function (req, res) {
		var id = req.params.id;

		article.remove({_id: id}, function (err) {
			if (err) {
				res.sendStatus(304);
			} else {
				res.sendStatus(200);
			}
		});
	});

	return router;
}

