const logger = require('../../services/logger.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const boardService = require('./board.service')

async function getBoards(req, res) {
	try {
		const filterBy = { ...req.query }

		console.log(req.query)

		const boards = await boardService.query(filterBy)
		res.send(boards)
	} catch (err) {
		logger.error('Cannot get boards', err)
		res.status(500).send({ err: 'Failed to get boards' })
	}
}

module.exports = {
	getBoards,
}
