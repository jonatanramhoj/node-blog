var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var mongoose = require('mongoose');
var article = mongoose.model('article');

router.get('/', function(req, res, next) {

	article.find().sort({date: -1}).exec(function (err, articles) {
		article.find().limit(1).sort({date: -1}).exec(function(err, latest) {
			if (err) {
				return res.render('500');
			} else {
				res.render('index', {
					articles: articles, // Show all articles
					featured: latest // Show latest article
				});
			}
		});
	});
});

module.exports = router;
