const routes = require('express').Router()
const requestSW = require('../controllers/requestControler')

routes.use(function (req, res, next) {
  console.info(`${req.method} ${req.originalUrl}`)

  res.on('finish', () => {
    console.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
  })

  next()
})

routes.get('/StarWars', requestSW.findStarWars)
routes.get('/StarWarsLog', requestSW.findRequest)

module.exports = routes
