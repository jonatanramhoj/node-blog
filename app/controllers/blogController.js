var articles = require('../models/articles');

/**
* List all articles
*
*/
exports.listAll = function (req, res) {
	// Add data to handlebars template
	res.render('index', {
		articles: articles
	});
};
