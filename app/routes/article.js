var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var mongoose = require('mongoose');
var articleModel = require('../models/article');
var article = mongoose.model('article');

/* GET single article. */
router.get('/', function(req, res, next) {
	blogController.showSingle(req, res);
});

/* Create new article */
router.post('/new', function (req, res) {
	var data = req.body;
	var newArticle = new article(data);

	newArticle.save(function (err, data) {
		if (err) {
			console.log('err:', err);
		} else {
			console.log('saved:', data);
		}
	});
	res.sendStatus(200);
});

/* Get new article */
router.get('/new', function (req, res) {
	res.render('new', {});
});

module.exports = router;
