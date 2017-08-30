<template>
	<div>
		<h3>{{board.name}}</h3>
		<div class="jumbotron">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-6 col-lg-3" v-for="list in lists">
						<div class="panel panel-default list-card">
							<h4 class="panel-header"><strong>{{list.name}}:</strong> {{list.description}}</h4>
							<div v-for="task in list.tasks">
								<p>{{task.name}}</p>
							</div>
							<div class="panel-body">
								<div class="panel panel-default">
									<form @submit.prevent="createTask(list._id)">
										<input type="text" placeholder="task" v-model="newTask.name">
										<button class="btn btn-default">Create Task</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-md-6 col-lg-3">
						<div @click="showListForm = true" class="panel panel-default action muted list-card">
							<h4>Create new list</h4>
							<span @click="removeList(list)"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="showListForm" id="create-list-parent" class="panel panel-default">
			<div class="panel-heading">Create List <span class="action muted" @click="showListForm = false">x</span></div>
			<form id="create-list-form" class="panel-body" @submit.prevent="createList">
				<input type="text" maxlength="50" placeholder="list name" v-model="newList.name" required>
				<input type="text" maxlength="140" placeholder="description" v-model="newList.description">
				<button class="btn">Create List</button>
			</form>
		</div>

	</div>

</template>

<script>
	export default {
		name: 'board',
		data() {
			return {
				newList: {
					name: '',
					description: ''
				},
				newTask: {
					// name: '',
					// description: ''
				},
				showListForm: false
			}
		},
		mounted() {
			this.$store.dispatch('getBoard', this.$route.params.id)
			this.$store.dispatch('getListsAndTasks', this.$route.params.id)
		},
		methods: {
			createList() {
				this.newList.name = this.newList.name.trim()
				if (this.newList.name) {
					this.newList.boardId = this.$route.params.id
					this.$store.dispatch('createList', this.newList)
					this.showListForm = false
					this.newList = {}
				}
			},
			createTask(listId) {
				this.newTask.name = this.newTask.name.trim();
				if (this.newTask.name) {
					this.newTask.listId = listId;
					this.newTask.boardId = this.$route.params.id;
					this.$store.dispatch('createTask', this.newTask);
					this.newTask = {};
				}
			}
		},
		computed: {
			board() {
				return this.$store.state.activeBoard
			},
			lists() {
				return this.$store.state.lists
			}
		}
	}

</script>

<style scoped>
	.panel {
		padding: 10px;
	}

	.list-card {
		/* height: 100px; */
		margin-top: 10px;
	}

	#create-list-parent {
		position: fixed;
		bottom: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
	}

	#create-list-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	input {
		margin-bottom: 10px;
	}
</style>