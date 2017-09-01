let Boards = require('../models/board')
let Users = require('../models/user')

module.exports = {
	userBoards: {
		path: '/userboards',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find User Boards'
			Boards.find({ creatorId: req.session.uid })
				.then(boards => {
					res.send(handleResponse(action, boards))
				}).catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	sharedBoards: {
		path: '/sharedBoards',
		reqType: 'get',
		method(req, res, next) {
			Boards.find({ collaborators: { $in: req.session.uid } })
				.then(boards => {
					res.send(handleResponse(action, boards))
				}).catch(error => {
					return next(handleResponse(action, null, error))
				})
		}
	},
	
	collaborators: {
		path: '/boards/:boardId/collaborators',
        reqType: 'put',
        method(req, res, next) {
			let action = 'Add a Collaborator by Username'
			Users.find({name: req.body})
				.then(user => {
					
					Boards.findByIdAndUpdate(req.params.boardId)
						.then(task => {
							console.log(task)
						})
						.catch(error => {
							console.log(error)
							// return next(handleResponse(action, null, error))
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