<template>
	<div id="app">
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-header-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a @click="" class="navbar-brand action">
						<p>Kanban</p>
					</a>
				</div>

				<div class="collapse navbar-collapse navbar-right" id="navbar-header-collapse">
					<ul class="nav navbar-nav">
						<li class="active">
							<a class="action" @click="">
								<router-link :to="{name: 'Boards'}">Home</router-link><span class="sr-only">(current)</span>
							</a>
						</li>
						<li id="login-button" v-if="!loggedIn"><a class="action" @click="closeFormListener">Login/Register</a></li>
						<!-- <li v-if="!loggedIn && showLogin"><a>Login/Register</a></li> -->
						<li v-if="loggedIn"><a class="action">{{name}}</a></li>
						<li v-if="loggedIn"><a class="action" @click="logout">Logout</a></li>
					</ul>
				</div>
			</div>
		</nav>
		<error></error>
		<router-view></router-view>
		<Login v-if="showLogin && !loggedIn"></Login>
	</div>
</template>

<script>
	import Error from './components/Error'
	import Login from './components/Login'
	import $ from 'jquery'
	export default {
		name: 'app',
		components: {
			Error, Login
		},
		data() {
			return {
				showLogin: false,
				eventHandled: false
			}
		},
		beforeMount() {
			this.$store.dispatch('checkForSession')
		},
		methods: {
			logout() {
				this.$store.dispatch('logout')
				this.showLogin = false;
			},
			// Closes the loginForm when clicking anywhere outside of it or hitting 'esc'
			closeFormListener() {
				if (this.eventHandled) {
					this.eventHandled = false;
					return;
				}
				this.showLogin = true;
				this.outsideClickOrEscapeListener('login-parent', () => { this.showLogin = false; }, 'login-button', (val) => { this.eventHandled = val })
			}
		},
		computed: {
			loggedIn() {
				return this.$store.state.loggedIn;
			},
			name() {
				return this.$store.state.name;
			}
		}
	}

</script>

<style>
	/* .panel {
		margin: 0 0 20px 0;
	} */

	.action,
	.glyphicon-trash {
		cursor: pointer;
	}

	.muted,
	.glyphicon-trash {
		opacity: 0.8;
	}

	.muted:hover,
	.glyphicon-trash:hover {
		opacity: 1;
	}

	.moveable {
		cursor: move;
	}

	.dragArea {
		min-height: 10px;
	}
</style>

<style scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>