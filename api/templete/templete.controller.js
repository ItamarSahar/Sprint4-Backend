const logger = require('../../services/logger.service')
const authService = require('../auth/auth.service')
const userService = require('../user/user.service')

const socketService = require('../../services/socket.service')
const templeteService = require('./templete.service')

async function getTempletes(req, res) {
	try {
		const filterBy = { ...req.query }

		const templetes = await templeteService.query(filterBy)
		console.log(templates);
		res.send(templetes)
	} catch (err) {
		logger.error('Cannot get templetes', err)
		res.status(500).send({ err: 'Failed to get templetes' })
	}
}

module.exports = {
	getTempletes,
}
