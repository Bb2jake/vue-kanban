<template>
	<div>
		<div class="panel panel-default list-card hidden-children">
			<h4 class="panel-header"><strong>{{list.name}}:</strong> {{list.description}}</h4>
			<Draggable v-model="tasks" :options="{draggable: '.task-item', group: 'tasks'}" :move="onMove" @end="onEnd">
				<div v-for="task in tasks" class="task-item" :id="task._id">
					<Task :task="task"></Task>
				</div>
			</Draggable>
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
	import Draggable from 'vuedraggable'
	export default {
		components: {
			Task, Draggable
		},
		props: ['list'],
		data() {
			return {
				newTask: {
					// name: '',
					// description: ''
				},
				dragStartListId: '',
				dragEndListId: ''
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
			onMove(e, o) {
				if (!e.relatedContext || !e.relatedContext.element)
					return
				if (!this.dragStartListId)
					this.dragStartListId = e.draggedContext.element.listId;

				e.draggedContext.element.listId = e.relatedContext.element.listId
				this.dragEndListId = e.relatedContext.element.listId
			},
			onEnd(e) {
				this.$store.dispatch('setTaskIndexes', { listId: this.dragStartListId, tasks: this.$store.state.tasks[this.dragStartListId] })
				if (this.dragStartListId != this.dragEndListId)
					this.$store.dispatch('setTaskIndexes', { listId: this.dragEndListId, tasks: this.$store.state.tasks[this.dragEndListId] })

				this.dragStartListId = '';
				this.dragEndListId = '';
			}
		},
		computed: {
			tasks: {
				get() {
					return this.$store.state.tasks[this.list._id]
				},
				set(value) {
					this.$store.commit('setTasks', { listId: this.list._id, tasks: value })
				}
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