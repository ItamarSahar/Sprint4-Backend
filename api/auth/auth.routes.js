const express = require('express')
const {login, signup, logout} = require('./auth.controller')
const { log } = require('../../middlewares/logger.middleware')

const router = express.Router()

router.post('/login',log, login)
router.post('/signup',log, signup)
router.post('/logout', logout)

module.exports = router