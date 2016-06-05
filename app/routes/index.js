var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var article = mongoose.model('article');
var paginate = require('express-paginate');
var hbs = require('hbs');

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
		var limit = 6;
		var page = (req.query.page > 0 ? req.query.page : 1) - 1; // Get current page number

		article.find().limit(limit).skip(limit * page).sort({date: -1}).exec(function (err, articles) {
				if (err) {
					return res.render('500');
				} else {
					article.count().exec(function (err, count) {
						res.render('index', {
							articles: articles,
							page: page + 1,
							pages: Math.ceil(count / limit)
						});
					});
				}
		});

		// Pagination helper
		hbs.registerHelper('pagination', function (pages, page) {
			var url = require('url');
			var qs = require('qs');
			var params = qs.parse(url.parse(req.url).query);
			var str = '';

			params.page = 0;

			for (var p = 1; p < pages + 1; p++) {
				params.page = p;
				clas = page == p ? 'active' : 'no';
				str += '<li class="' + clas + '"><a href="?' + qs.stringify(params) + '">' + p + '</a></li>';
			}

			return str;
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

