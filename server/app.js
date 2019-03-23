const createError = require('http-errors');
const mongoose = require('mongoose');
const helmet = require('helmet')
const compression = require('compression')
const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const auth = require('./lib/auth')
const routes = require('./routes/index');

const app = express();
app.use(helmet())
app.use(compression())


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'muySecret is very strong',
  resave: true,
  saveUninitialized: false,
  store:new MongoStore({mongooseConnection:mongoose.connection})
}));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(auth.initialize);
app.use(auth.session);
app.use(auth.setUser)

app.use('/', routes());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;