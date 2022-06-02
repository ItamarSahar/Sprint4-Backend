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
		const collection = await dbService.getCollection('templete')
		var templetes = await collection.find(criteria).toArray()
		templetes = templetes.map((templete) => {
			return templete
		})
		return templetes
	} catch (err) {
		logger.error('cannot find templetes', err)
		throw err
	}
}

function _buildCriteria(filterBy) {
	const criteria = {}
	if (filterBy._id) criteria._id = ObjectId(filterBy._id)
	return criteria
}
