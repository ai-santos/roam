import express from 'express'

const router = express.Router()

router.get( '/', (request, response, next) => {
  response.render('home')
})

router.get( '/dashboard', (request, response, next) => {
  response.render('users/dashboard')
})

module.exports = router
