//Express setup
var express = require('express');
var bodyParser= require('body-parser');
var path = require('path');
var logger = require('morgan');

//User authentication
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Session Cookies
var session = require('express-session');
var MongoStore = require('connect-mongo');

var connect = process.env.MONGODB_URI
console.log(process.env.MONGODB_URI);
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect(connect);
mongoose.connection.on('connected', function(){
  console.log('mongoose connection successful');
})
mongoose.connection.on('error', function(){
  console.log('mongoose connection NOT successful');
  console.log(process.env.MONGODB_URI)
})
mongoose.Promise = Promise;

// app.use(session({
//   secret: process.env.SECRET,
//   cookie: {
//     // In milliseconds, i.e., 10 days
//     maxAge: 1000 * 60 * 60 * 24 * 10
//   },
//   proxy: true,
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({mongooseConnection: mongoose.connection})
// }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// passport.use(new LocalStrategy({
//   //passport with phonenumber
// }));

//paths
// app.use();

//Catch 404 and forward to error handler
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

var port = process.env.PORT ||3000;
console.log('listening on port ' + port);
app.listen(port);

module.exports = app;
