'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authUrl = "https://github.com/login/oauth/authorize";
var router = _express2.default.Router();

router.get('/', function (request, response, next) {
  response.render('home');
});

router.get('/cities', function (request, response, next) {
  response.render('cities');
});

module.exports = router;