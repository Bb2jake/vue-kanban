let Boards = require('../models/board')
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Users = require('../models/user')

export default {
	boardLists: {
		path: '/boards/:boardId/lists',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find List by Board'
			Lists.find({ boardId: req.params.boardId })
				.then(lists => {
					
				})
		}
	}
}