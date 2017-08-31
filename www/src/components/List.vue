<template>
	<div>
		<div class="panel panel-default list-card hidden-children">
			<h4 class="panel-header"><strong>{{list.name}}:</strong> {{list.description}}</h4>
			<div v-for="task in tasks">
				<Task :task="task"></Task>
			</div>
			<div class="panel-body">
				<div class="panel panel-default">
					<form @submit.prevent="createTask(list._id)">
						<input type="text" placeholder="task" v-model="newTask.name">
						<button class="btn btn-default">Create Task</button>
					</form>
				</div>
			</div>
			<span class="glyphicon glyphicon-trash hidden-child" @click="removeList(list)"></span>
		</div>
	</div>
</template>


<script>
	import Task from './Task'
	export default {
		components: {
			Task
		},
		props: ['list'],
		data() {
			return {
				newTask: {
					// name: '',
					// description: ''
				},
			}
		},
		methods: {
			removeList(list) {
				this.$store.dispatch('removeList', list)
			},
			createTask(listId) {
				this.newTask.name = this.newTask.name.trim();
				if (this.newTask.name) {
					this.newTask.listId = listId;
					this.newTask.boardId = this.$route.params.id;
					this.newTask.index = this.$store.state.tasks[listId].length;
					this.$store.dispatch('createTask', this.newTask);
					this.newTask = {};
				}
			},
		},
		computed: {
			tasks() {
				return this.$store.state.tasks[this.list._id]
			}
		}
	}

</script>


<style scoped>
	.hidden-children .hidden-child {
		display: none;
	}

	.hidden-children:hover .hidden-child {
		display: initial;
	}
</style>