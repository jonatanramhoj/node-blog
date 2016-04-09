var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');

/* GET all articles. */
router.get('/', function(req, res, next) {
	blogController.listAll(req, res);
});

module.exports = router;
