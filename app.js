"use strict"
//Express setup
const express = require('express'),
      bodyParser= require('body-parser'),
      path = require('path'),
      logger = require('morgan'),
      exphbs = require('express-handlebars');

//User authentication
const passport = require('passport'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

//Session Cookies
var session = require('express-session');
var MongoStore = require('connect-mongo');

//routes
var authRoutes = require('./auth/route');
var friendRoutes = require('./friend/route');
var seshRoutes = require('./sesh/route');
var userRoutes = require('./user/route');

var connect = process.env.MONGODB_URI

var app = express();
app.engine('.hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', 'hbs');

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
})
mongoose.Promise = Promise;

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: process.env.SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);


const requireAuth = passport.authenticate('jwt', { session: false });

//routing paths
 app.use(authRoutes);
 // app.use(requireAuth, friendRoutes);
 // app.use(requireAuth, seshRoutes);
 // app.use(requireAuth, userRoutes);

//Catch 404 and forward to error handler
// app.use(function(req, res, next){
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT ||3000;
console.log('listening on port ' + port);
app.listen(port);

module.exports = app;
