import express from 'express'
import expressSession from 'express-session'
import index from './routes/index'
import path from 'path' //package like express
import logger from 'morgan' // http request logger middlewre for node.js. it's a helper that collects log from your server
import bodyParser from 'body-parser' //allows to have access to the body of the request using request.body. u can do it urself but body parser does it for u
import cookieParser from 'cookie-parser'
import passport from 'passport'
import Strategy from 'passport-github'

require('dotenv').config()

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8080/auth_callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    cb(null, {
      accessToken: accessToken,
      profile: profile
    })
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

const server = express() //how u wire up express . u can access this express funciton using const server

//middleware
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs');


server.use(logger('dev'))
server.use(express.static(path.join(__dirname + '/public')))
server.use(cookieParser())
server.use(bodyParser.urlencoded({extended: true}))
server.use(expressSession(
  {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }))

server.use(passport.initialize())
server.use(passport.session())


//routes
server.use('/', index)

server.get('/login', passport.authenticate('github'))

server.get('/auth_callback', passport.authenticate('github'), (req, res) => {
    //yay! logged in to github
    console.log('here')
    res.redirect('/dashboard')
})

server.get('/dashboard', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    console.log('our user', req.user)
    res.render('users/dashboard', { user: req.user } )
})

server.listen(process.env.PORT || 8080)

module.exports = server
