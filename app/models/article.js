var article = {
	"intro": {
		"title": "BEMIT",
		"date": "18 April 2016",
		"tags": "#CSS",
		"author": "Jonatan Ramhöj",
		"image": "../img/css.jpg"
	},
	"heading": "Lorem ipsum dolor!",
	"body": [
		{
			"paragraph": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			"paragraph": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
		},
		{
			"paragraph": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			"code": "$(document).ready(function() {\n    alert(Hello world); \n});"
		},
		{
			"paragraph": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		}
	]
};

// Make model available in app
module.exports = article;