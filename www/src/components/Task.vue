<template>
	<div class="task">
		<p class="task-hidden-children">
			<span class="action" @click="toggleComments">{{task.name}}</span>
			<span class="glyphicon glyphicon-trash task-hidden-child" @click="removeTask"></span>
		</p>
		<div v-show="showComments">
			<ul>
				<li class="comment-hidden-children" v-for="comment in comments">{{comment.body}} - {{comment.creatorName || 'unknown'}}
					<span class="glyphicon glyphicon-trash comment-hidden-child" @click.prevent.stop="removeComment(comment)"></span>
				</li>
			</ul>
			<div id="create-board-parent" class="panel panel-default">
				<div class="panel-heading">comments</div>
				<form id="create-board-form" class="panel-body" @submit.prevent="createComment">
					<input type="text" maxlength="50" placeholder="comment" v-model="newComment">
					<button class="btn">Create Comment</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['task'],
		data() {
			return {
				showComments: false,
				newComment: ''
			}
		},
		methods: {
			removeTask() {
				this.$store.dispatch('removeTask', this.task)
			},
			toggleComments() {
				if (!this.task.comments) {
					this.$store.dispatch('getComments', this.task._id)
				}
				this.showComments = !this.showComments;
			},
			createComment() {
				this.newComment = this.newComment.trim();
				if (this.newComment) {
					this.$store.dispatch('createComment', { taskId: this.task._id, body: this.newComment })
					this.newComment = '';
				}
			},
			removeComment(comment) {
				this.$store.dispatch('removeComment', comment)
			}
		},
		computed: {
			comments() {
				return this.$store.state.comments[this.task._id]
			}
		}
	}
</script>


<style scoped>
	.comment-hidden-children .comment-hidden-child {
		display: none;
	}

	.comment-hidden-children:hover .comment-hidden-child {
		display: initial;
	}

	.task-hidden-children .task-hidden-child {
		display: none;
	}

	.task-hidden-children:hover .task-hidden-child {
		display: initial;
	}
</style>