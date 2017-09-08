let Boards = require('../models/board')
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Users = require('../models/user')

module.exports = {
	lists: {
		path: '/boards/:boardId/lists',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find Lists by Board'
			Lists.find({ boardId: req.params.boardId })
				.then(lists => {
					res.send(handleResponse(action, lists))
				})
				.catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	tasks: {
		path: '/boards/:boardId/tasks',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find Tasks by Board'
			Tasks.find({ boardId: req.params.boardId })
				.then(tasks => {
					res.send(handleResponse(action, tasks))
				})
				.catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	collaborators: {
		path: '/boards/:boardId/collaborators',
		reqType: 'put',
		method(req, res, next) {
			let action = 'Add a Collaborator by Username'
			Users.find({
				name: req.body
			})
				.then(user => {

					Boards.findById(req.params.boardId)
						.then(board => {
							board.collaborators.push(user._id)
							board.save()
								.then(res => {
									console.log(res)
								})
								.catch(error => {
									return next(handleResponse(action, null, error))
								})
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