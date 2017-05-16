import express from 'express'



const router = express.Router()

//refactor database functions to only make database calls
router.get( '/', (request, response, next) => {
  response.render('home')
})

module.exports = router
