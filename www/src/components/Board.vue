<template>
    <div>
        <h3>{{board.name}}</h3>
        <div class="jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-6 col-lg-3" v-for="list in lists">
                        <List :list="list"></List>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-3">
                        <div id="open-form-btn" @click="closeFormListener" class="panel panel-default action muted list-card">
                            <h4>Create new list</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showListForm" id="create-list-parent" class="panel panel-default">
            <div class="panel-heading">Create List <span id="exit-form-btn" class="action muted" @click="showListForm = false">x</span></div>
            <form id="create-list-form" class="panel-body" @submit.prevent="createList">
                <input type="text" maxlength="50" placeholder="list name" v-model="newList.name" required>
                <input type="text" maxlength="140" placeholder="description" v-model="newList.description">
                <button class="btn">Create List</button>
            </form>
        </div>

    </div>

</template>

<script>
    import $ from 'jquery'
    import List from './List'
    export default {
        name: 'board',
        components: {
            List
        },

        data() {
            return {
                newList: {
                    // name: '',
                    // description: ''
                },
                showListForm: false,
                listenerCaught: false
            }
        },
        mounted() {
            this.$store.dispatch('getBoard', this.$route.params.id)
            this.$store.dispatch('getListsAndTasks', this.$route.params.id)
        },
        methods: {
            createList() {
                this.newList.name = this.newList.name.trim()
                if (this.newList.name) {
                    this.newList.boardId = this.$route.params.id
                    this.$store.dispatch('createList', this.newList)
                    this.showListForm = false
                    this.newList = {}
                }
            },
            closeFormListener() {
                this.showListForm = true;
                this.outsideClickOrEscapeListener('create-list-parent', () => {this.showListForm = false;})

                // if (this.listenerCaught) {
                //     this.listenerCaught = false;
                //     return;
                // }
                // let _this = this;
                // this.showListForm = true;
                // $(document).mouseup(e => {
                //     let createListForm = $('#create-list-parent');
                //     // if the target of the click isn't the container nor a descendant of the container
                //     if (!createListForm.is(e.target) && createListForm.has(e.target).length === 0) {
                //         _this.showListForm = false;

                //         let openFormBtn = $('#open-form-btn');
                //         _this.listenerCaught = openFormBtn.is(e.target) || openFormBtn.has(e.target).length > 0;

                //         $(document).unbind('mouseup');
                //         $(document).unbind('keyup')
                //     }
                // });
                // $(document).on('keyup', e => {
                //     if (e.keyCode == 27) {
                //         _this.showListForm = false;

                //         $(document).unbind('mouseup');
                //         $(document).unbind('keyup')
                //     }
                // });
            }
        },
        computed: {
            board() {
                return this.$store.state.activeBoard
            },
            lists() {
                return this.$store.state.lists
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