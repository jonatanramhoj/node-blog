var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');

/* GET single article. */
router.get('/', function(req, res, next) {
	blogController.showSingle(req, res);
	// res.render('article', { title: 'Article - jonatanramhoj.co' });
});

module.exports = router;
