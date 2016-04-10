var articles = require('../models/articles');
var article = require('../models/article');

/**
* List all articles
*
*/
exports.listAll = function (req, res) {
	// Add data to handlebars template
	res.render('index', {
		articles: articles,
		title: 'Articles - jonatanramhoj.co' 
	});
};

/**
* Show single article
*
*/
exports.showSingle = function (req, res) {
	// Add data to handlebars template
	res.render('article', {
		article: article,
		title: 'Article - jonatanramhoj.co'
	});
};