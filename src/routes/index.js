import express from 'express'

const router = express.Router()

router.get( '/', (request, response, next) => {
  response.render('home')
})

router.get( '/dashboard', (request, response, next) => {
  response.render('users/dashboard')
})

router.get( '/cities', (request, response, next) => {
  response.render('cities')
})


module.exports = router
