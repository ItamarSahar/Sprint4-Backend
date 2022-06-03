const logger = require('../../services/logger.service')
const authService = require('../auth/auth.service')
const userService = require('../user/user.service')

const socketService = require('../../services/socket.service')
const boardService = require('./board.service')

async function getBoard(req, res) {
	try {
		const board = await boardService.getById(req.params.id)
		res.send(board)
	} catch (err) {
		logger.error('Failed to get board', err)
		res.status(500).send({ err: 'Failed to get board' })
	}
}

async function getBoards(req, res) {
	try {
		const filterBy = { ...req.query }

		console.log('req.query:board.c', req.query)

		const boards = await boardService.query(filterBy)
		res.send(boards)
	} catch (err) {
		logger.error('Cannot get boards', err)
		res.status(500).send({ err: 'Failed to get boards' })
	}
}

async function addBoard(req, res) {
	var loggedinUser = authService.validateToken(req.cookies.loginToken)
	
	try {
		var board = req.body
		console.log(board);
		board = await boardService.add(board)

		loggedinUser = await userService.update(loggedinUser)

		// User info is saved also in the login-token, update it
		const loginToken = authService.getLoginToken(loggedinUser)
		res.cookie('loginToken', loginToken)

		// socketService.broadcast({
		// 	type: 'review-added',
		// 	data: review,
		// 	userId: review.byUserId,
		// })
		// socketService.emitToUser({
		// 	type: 'review-about-you',
		// 	data: review,
		// 	userId: review.aboutUserId,
		// })

		// const fullUser = await userService.getById(loggedinUser._id)
		// socketService.emitTo({
		// 	type: 'user-updated',
		// 	data: fullUser,
		// 	label: fullUser._id,
		// })

		res.send(board)
	} catch (err) {
		console.log(err)
		logger.error('Failed to add board', err)
		res.status(500).send({ err: 'Failed to add board' })
	}
}

async function updateBoard(req, res) {
    try {
        const board = req.body
        // console.log('board from front:' , board);
        const savedBoard = await boardService.update(board)
        res.send(savedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}

module.exports = {
	getBoards,
	getBoard,
	addBoard,
	updateBoard
}
