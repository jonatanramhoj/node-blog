var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var mongoose = require('mongoose');
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

	// GET home page
	router.get('/', function(req, res, next) {
		article.find().sort({date: -1}).populate('author').exec(function (err, articles) {
			article.find().limit(1).sort({date: -1}).populate('author').exec(function(err, latest) {
				if (err) {
					return res.render('500');
				} else {
					res.render('index', {
						title: 'jonatanramhoj.co - blog',
						articles: articles, // Show all articles
						featured: latest, // Show latest article
						user: req.user
					});
				}
			});
		});
	});

	/* GET login page */
	router.get('/login', function(req, res) {
		// Display the Login page with any flash message, if any
		res.render('login', {message: req.flash('message')});
	});

	// Handle login POST
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// GET Registration page
	router.get('/signup', function (req, res) {
		res.render('register', {message: req.flash('message')});
	});

	// Handle Registration POST
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// Handle logout
	router.get('/signout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}

