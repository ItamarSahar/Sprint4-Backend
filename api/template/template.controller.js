const logger = require('../../services/logger.service')
const authService = require('../auth/auth.service')
const userService = require('../user/user.service')

const socketService = require('../../services/socket.service')
const templateService = require('./template.service')

async function getTemplates(req, res) {
	try {
		const filterBy = { ...req.query }

		const templates = await templateService.query(filterBy)
		res.send(templates)
	} catch (err) {
		logger.error('Cannot get templates', err)
		res.status(500).send({ err: 'Failed to get templates' })
	}
}

async function getTemplate(req, res) {
	try {
		const template = await templateService.getById(req.params.id)
		res.send(template)
	} catch (err) {
		logger.error('Failed to get templete', err)
		res.status(500).send({ err: 'Failed to get templete' })
	}
}

module.exports = {
	getTemplates,
	getTemplate
}
