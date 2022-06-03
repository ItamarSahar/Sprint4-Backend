const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

module.exports = {
	query,
	getById,
	add,
	update
}

async function query(filterBy = {}) {
	const criteria = _buildCriteria(filterBy)
	console.log('criteria:',criteria);
	try {
		const collection = await dbService.getCollection('board')
		var boards = await collection.find(criteria).toArray()
		boards = boards.map((board) => {
			return board
		})
		return boards
	} catch (err) {
		logger.error('cannot find boards', err)
		throw err
	}
}

async function getById(boardId) {
	try {
		const collection = await dbService.getCollection('board')
		const board = await collection.findOne({ _id: ObjectId(boardId) })

		return board
	} catch (err) {
		logger.error(`while finding board ${boardId}`, err)
		throw err
	}
}

async function add(board) {
	try {
		const boardToAdd = board
		const collection = await dbService.getCollection('board')
		await collection.insertOne(boardToAdd)
		return boardToAdd
	} catch (err) {
		logger.error('cannot insert review', err)
		throw err
	}
}

async function update(board) {
	try {
		// peek only updatable properties44778/
		const boardToSave = {...board, _id:ObjectId(board._id)}
		const collection = await dbService.getCollection('board')
		const updateBoard =await collection.updateOne({ _id: boardToSave._id }, { $set: boardToSave })
		console.log('update', updateBoard);
		return boardToSave
	} catch (err) {
		logger.error(`cannot update board ${board._id}`, err)
		throw err
	}
}

function _buildCriteria(filterBy) {
	const criteria = {}
	if (filterBy._id) criteria._id = ObjectId(filterBy._id)
	return criteria
}
