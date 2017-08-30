// api('task/' + id + '/comments')

let Tasks = require('../models/task')
let Users = require('../models/user')
let Comments = require ('../models/comment')

module.exports = {
	comments: {
		path: '/tasks/:taskId/comments',
		reqType: 'get',
		method(req, res, next) {
			let action = 'Find Comments by Task'
			Comments.find({ taskId: req.params.taskId })
				.then(comments => {
                    res.send(handleResponse(action, comments))
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