const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

module.exports = {
	query,
}

async function query(filterBy = {}) {
	const criteria = _buildCriteria(filterBy)
	try {
		const collection = await dbService.getCollection('board')
		var boards = await collection.find(criteria).toArray()
		boards = boards.map((board) => {
			// board.createdAt = ObjectId(user._id).getTimestamp()
			// Returning fake fresh data
			// user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
			return board
		})
		return boards
	} catch (err) {
		logger.error('cannot find boards', err)
		throw err
	}
}

function _buildCriteria(filterBy) {
	const criteria = {}
	if (filterBy.txt) {
		const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
		criteria.$or = [
			{
				username: txtCriteria,
			},
			{
				fullname: txtCriteria,
			},
		]
	}
	if (filterBy.minBalance) {
		criteria.score = { $gte: filterBy.minBalance }
	}
	return criteria
}
