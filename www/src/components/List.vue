<template>
	<div>
		<div class="panel panel-default list-card hidden-children">
			<h4 class="panel-header"><strong>{{list.name}}:</strong> {{list.description}}</h4>
			<Draggable :id="list._id" v-model="tasks" :options="{draggable:'.task-item', group: 'tasks'}" :move="onMove" @end="onEnd">
				<div class="task-item" v-for="task in tasks" :id="task._id">
					<Task :task="task" :key="task.index"></Task>
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
				dragStartList: '',
				dragEndList: ''
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
			onMove(event, originalEvent) {
				if (!this.dragStartList)
					this.dragStartList = event.draggedContext.element.listId;

				event.draggedContext.element.listId = event.relatedContext.element.listId;
				this.dragEndList = event.relatedContext.element.listId;
			},
			onEnd(e) {
				// Reorder dragStartList
				this.$store.dispatch('setTaskOrder', { listId: this.dragStartList, tasks: this.$store.state.tasks[this.dragStartList] })
				if (this.dragStartList != this.dragEndList) {
					this.$store.dispatch('setTaskOrder', { listId: this.dragEndList, tasks: this.$store.state.tasks[this.dragEndList] })
					// Reorder dragEndList
				}
				this.dragStartList = '';
				this.dragEndList = '';
			}
		},
		computed: {
			tasks: {
				get() {
					return this.$store.state.tasks[this.list._id]
				},
				set(value) {
					this.$store.commit('setTasks', { listId: this.list._id, tasks: value });
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