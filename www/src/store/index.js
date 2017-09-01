import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

let api = axios.create({
	baseURL: 'http://localhost:3000/api/',
	timeout: 2000,
	withCredentials: true
})

let auth = axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 2000,
	withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
	state: {
		boards: [],
		activeBoard: {},
		error: {},
		loggedIn: false,
		name: '',
		lists: [],
		tasks: {},
		comments: {}
	},
	mutations: {
		setBoards(state, data) {
			state.boards = data
		},
		setComments(state, data) {
			vue.set(state.comments, data.taskId, data.comments)
		},
		setActiveBoard(state, board) {
			state.activeBoard = board
		},
		setLists(state, lists) {
			lists.sort((a, b) => {
				return a.index - b.index
			})
			state.lists = lists
		},
		setTasks(state, payload) {
			state.tasks[payload.listId] = payload.tasks
		},
		setAllTasks(state, tasks) {
			state.lists.forEach(list => {
				let filteredTasks = tasks.filter(task => {
					return task.listId == list._id;
				})
				filteredTasks.sort((a, b) => {
					return a.index - b.index;
				})
				vue.set(state.tasks, list._id, filteredTasks);
			});
		},
		setTaskOrder(state, listId) {
			for (let i = 0; i < state.tasks[listId].length; i++) {
				state.tasks[listId][i].index = i;
			}
		},
		handleError(state, err) {
			state.error = err
		},
		setUser(state, payload) {
			state.name = payload.name;
			state.loggedIn = payload.loggedIn;
		},
		clearState(state) {
			state.boards = []
			state.activeBoard = {}
			state.error = {}
			state.loggedIn = false
			state.name = ''
			state.lists = []
			state.tasks = {}
			state.comments = {}
		}
	},
	actions: {
		getBoards({ commit, dispatch }) {
			api('userboards')
				.then(res => {
					commit('setBoards', res.data.data)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		getBoard({ commit, dispatch }, id) {
			api('boards/' + id)
				.then(res => {
					commit('setActiveBoard', res.data.data)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		getLists({ commit, dispatch }, id) {
			api('/boards/' + id + '/lists')
				.then(res => {
					dispatch('getTasksByBoard', id);
					commit('setLists', res.data.data)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		getTasks({ commit, dispatch }, listId) {
			api('/lists/' + listId + '/tasks')
				.then(res => {
					commit('setTasks', { tasks: res.data.data, listId: listId })
				})
				.catch(err => {
					commit('handleError', err);
				})
		},
		getTasksByBoard({ commit, dispatch }, boardId) {
			api('/boards/' + boardId + '/tasks')
				.then(res => {
					commit('setAllTasks', res.data.data)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		getComments({ commit, dispatch }, id) {
			api('tasks/' + id + '/comments')
				.then(res => {
					commit('setComments', { taskId: id, comments: res.data.data })
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		createBoard({ commit, dispatch }, board) {
			api.post('boards/', board)
				.then(res => {
					dispatch('getBoards')
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		createList({ commit, dispatch }, list) {
			api.post('lists/', list)
				.then(res => {
					dispatch('getLists', list.boardId)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		createTask({ commit, dispatch }, task) {
			api.post('tasks/', task)
				.then(res => {
					dispatch('getTasks', task.listId)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		createComment({ commit, dispatch }, comment) {
			api.post('comments/', comment)
				.then(res => {
					dispatch('getComments', comment.taskId)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		removeBoard({ commit, dispatch }, board) {
			api.delete('boards/' + board._id)
				.then(res => {
					dispatch('getBoards')
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		removeList({ commit, dispatch }, list) {
			api.delete('lists/' + list._id)
				.then(res => {
					dispatch('getLists', list.boardId)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		removeTask({ commit, dispatch }, task) {
			api.delete('tasks/' + task._id)
				.then(res => {
					dispatch('getTasks', task.listId)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		removeComment({ commit, dispatch }, comment) {
			api.delete('comments/' + comment._id)
				.then(res => {
					dispatch('getComments', comment.taskId)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		setTaskOrder({ commit, dispatch }, { listId, tasks }) {
			// console.log(tasks)
			commit('setTaskOrder', listId);
			// console.log(tasks)
			// tasks.forEach(function (task) {
			api.put('update-tasks', tasks)
				.then(res => {
					// Do nothing, more or less.
				})
				.catch(err => {
					commit('handleError', err)
				})
			// }, this);
		},

		// USER ACTIONS
		login({ commit, dispatch }, payload) {
			auth.post('login/', payload)
				.then(res => {
					res.data.data.loggedIn = true;
					commit('setUser', res.data.data)
					dispatch('getBoards');
				}).catch(res => {
					alert('Invalid email or password')
				})
		},
		register({ commit, dispatch }, payload) {
			auth.post('register/', payload)
				.then(res => {
					res.data.data.loggedIn = true;
					commit('setUser', res.data.data)
					console.log(res)
				}).catch(err => {
					commit('handleError', err)
				})
		},
		logout({ commit, dispatch }) {
			auth.delete('logout')
				.then(res => {
					commit('setUser', { name: '', loggedIn: false })
					commit('clearState')
					router.push({ name: 'Boards' })
				}).catch(err => commit('handleError', err))
		},
		checkForSession({ commit, dispatch }) {
			auth('authenticate')
				.then(res => {
					if (res.data.data)
						commit('setUser', { name: res.data.data.name, loggedIn: true })
				})
		},
		handleError({ commit, dispatch }, err) {
			commit('handleError', err)
		}
	}
})

export default store
