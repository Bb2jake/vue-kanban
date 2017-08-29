import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'

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
	},
	mutations: {
		setBoards(state, data) {
			state.boards = data
		},
		setActiveBoard(state, board) {
			state.activeBoard = board
		},
		setListsAndTasks(state, data) {
			state.lists = data.lists
			state.lists.forEach(list => {
				list.tasks = data.tasks.filter(task => {
					return task.listId == list._id;
				})
			});
		},
		handleError(state, err) {
			state.error = err
		},
		setUser(state, payload) {
			state.name = payload.name;
			state.loggedIn = payload.loggedIn;
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
					dispatch('getListsAndTasks', list.boardId)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		createTask({ commit, dispatch }, task) {
			api.post('tasks/', task)
				.then(res => {
					dispatch('getListsAndTasks', task.boardId)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		removeBoard({ commit, dispatch }, board) {
			api.delete('boards/' + board._id)
				.then(res => {
					this.getBoards()
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		getListsAndTasks({ commit, dispatch }, id) {
			api('/boards/' + id + '/listsAndTasks')
				.then(res => {
					commit('setListsAndTasks', res.data.data)
				})
				.catch(err => {
					commit('handleError', err)
				})
		},
		handleError({ commit, dispatch }, err) {
			commit('handleError', err)
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
					commit('setBoards', [])
					commit('setUser', { name: '', loggedIn: false })
				}).catch(err => commit('handleError', err))
		},
		checkForSession({ commit, dispatch }) {
			auth('authenticate')
				.then(res => {
					if (res.data.data)
						commit('setUser', { name: res.data.data.name, loggedIn: true })
				})
		}
	}

})


export default store
