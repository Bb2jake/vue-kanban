<template>
	<div>
		<h3>{{board.name}}</h3>
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<form id="add-collaborator-form" @submit.prevent="addCollaborator">
						<input type="text" maxlength="16" placeholder="Add Collaborator" v-model="newCollaborator" required>
						<button class="btn">Add</button>
					</form>
				</div>
			</div>
		</div>
		<div class="jumbotron">
			<div class="container">
				<div class="row">
					<Draggable class="moveable dragArea" v-model="lists" :options="{draggable: '.list-item', group: 'lists'}" @end="onEnd">
						<div class="col-xs-12 col-md-6 col-lg-3 list-item" v-for="list in lists">
							<List :list="list"></List>
						</div>
					</Draggable>
					<div class="col-xs-12 col-md-6 col-lg-3">
						<div id="open-form-btn" @click="closeFormListener" class="panel panel-default action muted list-card">
							<h4>Create new list</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="showListForm" id="create-list-parent" class="panel panel-default">
			<div class="panel-heading">Create List <span id="exit-form-btn" class="action muted" @click="hideListForm">x</span></div>
			<form id="create-list-form" class="panel-body" @submit.prevent="createList">
				<input ref="newListName" type="text" maxlength="50" placeholder="list name" v-model="newList.name" required>
				<input type="text" maxlength="140" placeholder="description" v-model="newList.description">
				<button class="btn">Create List</button>
			</form>
		</div>

	</div>

</template>

<script>
	import $ from 'jquery'
	import List from './List'
	import Vue from 'vue'
	import Draggable from 'vuedraggable'
	export default {
		name: 'board',
		components: {
			List, Draggable
		},
		data() {
			return {
				newList: {
					// name: '',
					// description: ''
				},
				newCollaborator: '',
				showListForm: false,
				eventHandled: false
			}
		},
		mounted() {
			this.$store.dispatch('getBoard', this.$route.params.id)
			this.$store.dispatch('getLists', this.$route.params.id)
		},
		methods: {
			createList() {
				this.newList.name = this.newList.name.trim()
				if (this.newList.name) {
					this.newList.boardId = this.$route.params.id
					this.newList.index = this.$store.state.lists.length;
					this.$store.dispatch('createList', this.newList)
					this.showListForm = false
					this.newList = {}
				}
			},
			addCollaborator() {
				this.newCollaborator = this.newCollaborator.trim()
				if (this.newCollaborator) {

				}
			},
			closeFormListener() {
				if (this.eventHandled) {
					this.eventHandled = false;
					return;
				}
				this.showListForm = true;
				Vue.nextTick(() => {
					this.$refs.newListName.focus();
				})
				this.outsideClickOrEscapeListener('create-list-parent', () => { this.showListForm = false; }, 'open-form-btn', (val) => { this.eventHandled = val })
			},
			hideListForm() {
				this.showListForm = false;
				this.unbindListeners();
			},
			onEnd(e) {
				this.$store.dispatch('setListIndexes', { boardId: this.$route.params.id, lists: this.lists })
			}
		},
		computed: {
			board() {
				return this.$store.state.activeBoard
			},
			lists: {
				get() {
					return this.$store.state.lists
				},
				set(value) {
					this.$store.commit('setLists', value)
				}
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