const express = require('express')
const GameController = require('./controllers/GameController')
const MoveController = require('./controllers/MoveController')

const routes = express.Router()


routes.post('/game', GameController.store)
routes.post('/game/:id/moviment', MoveController.store)

module.exports = routes


