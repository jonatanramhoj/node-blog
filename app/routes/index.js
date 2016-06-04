var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var mongoose = require('mongoose');
var article = mongoose.model('article');
var paginate = require('express-paginate');
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
		var query = {};
		var options = {
			sort: {date: -1},
			populate: 'author',
			offset: 1, // Skip latest article
			page: req.query.page,
			limit: req.query.limit // Show 6 per page
		};
		article.paginate(query, options, function (err, result, pageCount, itemCount) {
			article.find().limit(1).sort({date: -1}).populate('author').exec(function(err, latest) {
				if (err) {
					return res.render('500');
				} else {
					console.log('req:', req.page);
					console.log('getArrayPages:', paginate.getArrayPages());
					res.render('index', {
						title: 'jonatanramhoj/blog',
						articles: result.docs, // Show all articles (skip latest)
						featured: latest, // Show latest article
						user: req.user,
						total: result.total
						// pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
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

