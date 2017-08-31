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
                        <li id="login-button" v-if="!loggedIn"><a class="action" @click="closeLoginFormListener">Login/Register</a></li>
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
                listenerCaught: false
            }
        },
        mounted() {
            this.$store.dispatch('checkForSession')
        },
        methods: {
            showLoginBox() {
                if (!this.listenerCaught) {
                    this.closeLoginFormListener();
                } else {
                    this.listenerCaught = false;
                }
            },
            logout() {
                this.$store.dispatch('logout')
                this.showLogin = false;
            },
            // Closes the loginForm when clicking anywhere outside of it.
            closeLoginFormListener() {
                this.outsideClickOrEscapeListener('login-parent', () => {this.showLogin = false;})
                // if (this.listenerCaught) {
                //     this.listenerCaught = false;
                //     return;
                // }

                // let _this = this;
                // this.showLogin = true
                // $(document).mouseup(e => {
                //     let loginForm = $('#login-parent');
                //     // if the target of the click isn't the container nor a descendant of the container
                //     if (!loginForm.is(e.target) && loginForm.has(e.target).length === 0) {
                //         _this.showLogin = false;

                //         // If login button is the one clicked, consume event once
                //         let loginBtn = $('#login-button');
                //         _this.listenerCaught = loginBtn.is(e.target) || loginBtn.has(e.target).length > 0;
                //         $(document).unbind('mouseup');
                //         $(document).unbind('keyup')
                //     }
                // });
                // $(document).on('keyup', e => {
                //     if (e.keyCode == 27) {
                //         _this.showLogin = false;
                //         $(document).unbind('mouseup');
                //         $(document).unbind('keyup')
                //     }
                // });
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