var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var mongoose = require('mongoose');
var article = mongoose.model('article');

router.get('/', function(req, res, next) {

	/* List all articles and latest */
	article.find().sort({date: -1}).exec(function (err, articles) {
		article.find().limit(1).sort({date: -1}).exec(function(err, latest) {
			if (err) {
				return res.render('500');
			} else {
				res.render('index', {
					articles: articles,
					featured: latest
				});
			}
		});
	});
});

module.exports = router;
