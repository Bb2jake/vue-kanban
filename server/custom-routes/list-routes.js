let Tasks = require('../models/task')
let Users = require('../models/user')

module.exports = {
	tasks: {
		path: '/lists/:listId/tasks',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find Tasks by List'
			Tasks.find({ listId: req.params.listId })
				.then(tasks => {
                    res.send(handleResponse(action, tasks))
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