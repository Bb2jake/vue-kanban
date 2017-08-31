// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import io from 'socket.io-client'
import store from './store'
import $ from 'jquery'

let socket = io('http://localhost:3000')

socket.on('CONNECTED', function (data) {
    console.log(data)
    socket.emit('update', { data: 'blarg', boardId: '3289748320' })
})

Vue.mixin({
    methods: {
        outsideClickOrEscapeListener(formId, cb) {
            // if (this.listenerCaught) {
            // this.listenerCaught = false;
            // return;
            // }

            // let _this = this;
            this.showLogin = true
            $(document).mouseup(e => {
                let form = $(`#${formId}`);
                // if the target of the click isn't the container nor a descendant of the container
                if (!form.is(e.target) && form.has(e.target).length === 0) {

                    // If login button is the one clicked, consume event once
                    // let loginBtn = $('#login-button');
                    // _this.listenerCaught = loginBtn.is(e.target) || loginBtn.has(e.target).length > 0;
                    $(document).unbind('mouseup');
                    $(document).unbind('keyup')
                    cb();
                }
            });
            $(document).on('keyup', e => {
                if (e.keyCode == 27) {
                    $(document).unbind('mouseup');
                    $(document).unbind('keyup')
                    cb();
                }
            });
        }
    }
})

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App },
})