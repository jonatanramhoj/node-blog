// Require dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mongoose = require('mongoose');
var moment = require('moment');
var passport = require('passport');
var expressSession = require('express-session');

// Connect to local DB
// mongoose.connect('mongodb://localhost/blogDB');

// Connect to server DB
mongoose.connect('mongodb://heroku_gsmt362k:3t29kmt46btfpqu21b9sj8e2ja@ds013014.mlab.com:13014/heroku_gsmt362k');

// Include routes
var article = require('./app/routes/article')(passport);
var index = require('./app/routes/index')(passport);

// Setup express instance
var app = express();

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Register hbs partials
hbs.registerPartials(__dirname + '/app/views/partials');

// Register hbs helpers
hbs.registerHelper('formatDate', function(date, format) {
	var date = moment(date).format(format);
	return date;
});

// Check if a value is greater than something
hbs.registerHelper('ifCond', function (v1, v2, options) {
	if (v1 > v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'hbs');

// Configuring Passport
app.use(expressSession({
	secret: 'mySecretKey',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./app/passport/init');
initPassport(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// Apply the routes to the application
app.use('/article', article);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
				error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;