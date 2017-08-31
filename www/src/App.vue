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
								<router-link :to="{name: 'Boards'}">Home</router-link><span class="sr-only">(current)</span></a>
						</li>
						<!-- <li>
							<a class="action">
								<router-link :to="{name: 'MyTunes.Playlists'}">MyTunes</router-link>
							</a>
						</li> -->
						<li v-if="!loggedIn"><a class="action" @click="showLoginBox">Login/Register</a></li>
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
				showLogin: false
			}
		},
		mounted() {
			this.$store.dispatch('checkForSession')
		},
		methods: {
			showLoginBox() {
				// var listening
				if (!this.showLogin) {

					this.showLogin = true
					// if (this.showLogin)
					this.closeLoginFormListener();
				}
			},
			logout() {
				this.$store.dispatch('logout')
				this.showLogin = false;
			},
			// Closes the loginForm when clicking anywhere outside of it.
			closeLoginFormListener() {
				let _this = this;
				$(document).mouseup(function (e) {
					var loginForm = $("#login-parent");
					// if the target of the click isn't the container nor a descendant of the container
					if (!loginForm.is(e.target) && loginForm.has(e.target).length === 0) {
						_this.showLogin = false;
						$(document).unbind('mouseup');
						// setTimeout(listenForLoginButtonClick, 1);
					}
				});
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

	.action {
		cursor: pointer;
	}

	.muted {
		opacity: 0.8;
	}

	.muted:hover {
		opacity: 1;
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