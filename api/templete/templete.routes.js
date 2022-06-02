const express = require('express')
const {
	requireAuth,
	requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getTempletes } = require('./templete.controller')
const router = express.Router()

router.get('/', log, getTempletes)

module.exports = router
