import express from 'express'

const authUrl = "https://github.com/login/oauth/authorize"
const router = express.Router()

router.get( '/', (request, response, next) => {
  response.render('home')
})

router.get( '/cities', (request, response, next) => {
  response.render('cities')
})

module.exports = router
