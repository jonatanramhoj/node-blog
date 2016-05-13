var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var mongoose = require('mongoose');
// var articleModel = require('../models/article');
var article = mongoose.model('article');

/* Create new article */
router.post('/new', function (req, res) {
	var data = req.body;
	var newArticle = new article(data);

	newArticle.save(function (err, data) {
		if (err) {
			console.log('err:', err);
		} else {
			console.log('saved:', data);
			// TODO prompt user to confirm article before redirect to start
			res.redirect('/');
		}
	});
	// res.sendStatus(200);
});

/* Show new article page */
router.get('/new', function (req, res) {
	res.render('new', {
		title: 'New article'
	});
});

/* Show single article. */
router.get('/:id', function(req, res, next) {
	var id = req.params.id;

	article.findById(id, function (err, single) {
		res.render('article', single);
	});
});

module.exports = router;
