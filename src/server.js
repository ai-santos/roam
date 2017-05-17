import express from 'express'
import index from './routes/index'
import path from 'path' //package like express
import logger from 'morgan' // http request logger middlewre for node.js. it's a helper that collects log from your server
import bodyParser from 'body-parser' //allows to have access to the body of the request using request.body. u can do it urself but body parser does it for u
import cookieParser from 'cookie-parser'

const server = express() //how u wire up express . u can access this express funciton using const server

//middleware
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs');


server.use(logger('dev'))
server.use(express.static(path.join(__dirname + '/public')))
server.use(cookieParser())
server.use(bodyParser.urlencoded({extended: true}));

//routes
server.use('/', index)

server.listen(process.env.PORT || 8080)

module.exports = server
