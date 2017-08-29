let Boards = require('../models/board')
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Users = require('../models/user')

module.exports = {
	listsAndTasks: {
		path: '/boards/:boardId/listsAndTasks',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find Lists and Tasks by Board'
			Lists.find({ boardId: req.params.boardId })
				.then(lists => {
					Tasks.find({ boardId: req.params.boardId })
						.then(tasks => {
							res.send(handleResponse(action, { lists, tasks }))
						})
						.catch(error => {
							return next(handleResponse(action, null, error))
						})
				})
				.catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	}
}

function handleResponse(action, data, error) {
	var response = {
		action: action,
		data: data
	}
	if (error) {
		response.error = error
	}
	return response
}