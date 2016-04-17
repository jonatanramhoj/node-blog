// Module dependencies
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

// Database schema for model
var articleSchema = new Schema({
	title: String,
	heading: String,
	body: String,
	tags: String
});

// Create the article model
var article = mongoose.model('article', articleSchema);

// Make model available in app
module.exports = article;