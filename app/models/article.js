// Module dependencies
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

// Database schema for model
var articleSchema = new Schema({
	title: String,
	body: String,
	tags: String,
	date: {type: Date, default: Date.now},
	image: String,
	author: {
		type: mongoose.Schema.Types.ObjectId, ref: 'user'
	}
});

// Create the article model
var article = mongoose.model('article', articleSchema);

// Make model available in app
module.exports = article;