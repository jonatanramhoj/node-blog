var express = require('express');
var router = express.Router();

/* GET single article. */
router.get('/', function(req, res, next) {
	res.render('article', { title: 'Article - jonatanramhoj.co' });
});

module.exports = router;
