var article = require('../models/article');

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