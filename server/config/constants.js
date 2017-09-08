const actions = {
	create: 'Create',
	update: 'Update',
	remove: 'Remove',
	find: 'Find',
	findAll: 'Find All'
}

const models = {
	board: {
		name: 'Board',
		endpoint: 'boards',
		useCustomRoutes: true
	},
	list: {
		name: 'List',
		endpoint: 'lists',
		useCustomRoutes: true
	},
	task: {
		name: 'Task',
		endpoint: 'tasks',
		useCustomRoutes: true
	},
	comment: {
		name: 'Comment',
		endpoint: 'comments',
		// useCustomRoutes: true
	},
	user: {
		name: 'User',
		endpoint: 'users',
		preventDefaultApi: true,
		useCustomRoutes: true
	}
}

module.exports = {
	actions,
	models
}