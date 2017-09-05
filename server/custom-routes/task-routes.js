let Users = require('../models/user')
let Comments = require('../models/comment')
let Tasks = require('../models/task')
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
    },
    updateTasks: {
        path: '/update-tasks',
        reqType: 'put',
        method(req, res, next) {
            let action = 'Update many tasks'
            req.body.forEach(function (task) {
                Tasks.findByIdAndUpdate(task._id, task)
                    .then(task => {
                        console.log(task)
                    })
                    .catch(error => {
                        console.log(error)
                        // return next(handleResponse(action, null, error))
                    })
            }, this);
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