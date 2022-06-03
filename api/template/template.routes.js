const express = require('express')
const {
	requireAuth,
	requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getTemplates, getTemplate } = require('./template.controller')
const router = express.Router()

router.get('/', log, getTemplates)
router.get('/:id', getTemplate)

module.exports = router
