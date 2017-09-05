// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import io from 'socket.io-client'
import store from './store'
import $ from 'jquery'
import draggable from 'vuedraggable'
// let socket = io('http://localhost:3000')

// socket.on('CONNECTED', function (data) {
//     console.log(data)
//     socket.emit('update', { data: 'blarg', boardId: '3289748320' })
// })

Vue.mixin({
    methods: {
        outsideClickOrEscapeListener(formId, cb, btnId, handledCb) {
            $(document).mouseup(e => {
                let form = $(`#${formId}`);
                // if the target of the click isn't the container nor a descendant of the container
                if (!form.is(e.target) && form.has(e.target).length === 0) {

                    // If open form button is the one clicked, consume event once
                    if (handledCb) {
                        let btn = $(`#${btnId}`);
                        let val = btn.is(e.target) || btn.has(e.target).length > 0;
                        handledCb(val);
                    }

                    this.unbindListeners();
                    cb();
                }
            });
            $(document).on('keyup', e => {
                if (e.keyCode == 27) {
                    this.unbindListeners()
                    cb();
                }
            });
        },
        unbindListeners() {
            $(document).unbind('mouseup');
            $(document).unbind('keyup')
        }
    }
})

new Vue({
    el: '#app',
    store,
	router,
	draggable,
    template: '<App/>',
    components: { App },
})