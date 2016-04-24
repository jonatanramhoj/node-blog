var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var mongoose = require('mongoose');
var article = mongoose.model('article');

/* GET all articles. */
router.get('/', function(req, res, next) {
	article.find(function (err, articles) {
		if (err) {
			return res.render('500');
		} else {
			res.render('index', {
				articles: articles
			});
		}
	});
});

module.exports = router;
