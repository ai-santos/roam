'use strict';

var passport = require('passport');

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://www.example.com/oauth2/authorize',
  tokenURL: 'https://www.example.com/oauth2/token',
  clientID: 'nB2YOUc01kBmilAqJABpNd6aOyFzjyF8',
  clientSecret: 'VHfmKyD2kTlzewWw_jDDR5KhRzkP_RZFx_nR5Jyxs-xJmqxcVH334AVH74poZtZB',
  callbackURL: "http://127.0.0.1:8080/auth_callback"
}, function (accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}));