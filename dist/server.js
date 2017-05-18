'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github');

var _passportGithub2 = _interopRequireDefault(_passportGithub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http request logger middlewre for node.js. it's a helper that collects log from your server
require('dotenv').config(); //allows to have access to the body of the request using request.body. u can do it urself but body parser does it for u
//package like express


_passport2.default.use(new _passportGithub2.default({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8080/auth_callback"
}, function (accessToken, refreshToken, dashboard, cb) {
  cb(null, {
    accessToken: accessToken,
    dashboard: dashboard
  });
}));

_passport2.default.serializeUser(function (user, cb) {
  cb(null, dashboard);
});

_passport2.default.deserializeUser(function (obj, cb) {
  cb(null, user);
});

var server = (0, _express2.default)(); //how u wire up express . u can access this express funciton using const server

//middleware
server.set('views', _path2.default.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use((0, _morgan2.default)('dev'));
server.use(_express2.default.static(_path2.default.join(__dirname + '/public')));
server.use((0, _cookieParser2.default)());
server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use((0, _expressSession2.default)({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

server.use(_passport2.default.initialize());
server.use(_passport2.default.session());

//routes
server.use('/', _index2.default);

server.get('/login', _passport2.default.authenticate('github'));

server.get('/auth_callback', _passport2.default.authenticate('github'), function (req, res) {
  console.log('is this working...please');
  //yay! logged in to github
  console.log('here');
  res.redirect('./views/users/dashboard');
});

server.get('/dashboard', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
  console.log('our user', req.user);
  res.render('./views/users/dashboard', { user: req.user });
});

server.listen(process.env.PORT || 8080);

module.exports = server;