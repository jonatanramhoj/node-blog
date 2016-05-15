// Module dependencies
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

// Database schema for model
var userSchema = new Schema({
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});

// Create the user model
var user = mongoose.model('user', userSchema);

// Make model available in app
module.exports = user;