const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

module.exports = {
	query,
	getById
}

async function query(filterBy = {}) {
	const criteria = _buildCriteria(filterBy)
	try {
		const collection = await dbService.getCollection('templete')
		var templates = await collection.find(criteria).toArray()
		templates = templates.map((template) => {
			return template
		})
		return templates
	} catch (err) {
		logger.error('cannot find templetes', err)
		throw err
	}
}

async function getById(templateId) {
	try {
		const collection = await dbService.getCollection('templete')
		const template = await collection.findOne({ _id: ObjectId(templateId) })

		return template
	} catch (err) {
		logger.error(`while finding template ${templateId}`, err)
		throw err
	}
}

function _buildCriteria(filterBy) {
	const criteria = {}
	if (filterBy._id) criteria._id = ObjectId(filterBy._id)
	return criteria
}
