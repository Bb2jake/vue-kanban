<template>
    <div class="container boards">
        <div class="row">
            <div class="col-xs-12 col-md-6 col-lg-3" v-for="board in boards">
                <router-link :to="'/boards/'+board._id">
                    <div class="panel panel-default hidden-children board-card">
                        <h4>{{board.name}}</h4>
                        <span class="glyphicon glyphicon-trash hidden-child" @click.prevent.stop="removeBoard(board)"></span>
                    </div>
                </router-link>
            </div>
            <div v-if="loggedIn" class="col-xs-12 col-md-6 col-lg-3">
                <div id="open-board-form-btn" @click="closeFormListener" class="panel panel-default action muted board-card">
                    <h4>Create new board</h4>
                </div>
            </div>
            <div v-else>
                <h1>Please login to continue.</h1>
            </div>
        </div>
        <div v-if="showBoardForm" id="create-board-parent" class="panel panel-default">
            <div class="panel-heading">Create Board <span class="action muted" @click="hideBoardForm">x</span></div>
            <form id="create-board-form" class="panel-body" @submit.prevent="createBoard">
                <input ref="newBoardName" type="text" maxlength="50" placeholder="board name" v-model="newBoard.name" required>
                <input type="text" maxlength="140" placeholder="description" v-model="newBoard.description">
                <button class="btn">Create Board</button>
            </form>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue';
    export default {
        name: 'boards',
        data() {
            return {
                newBoard: {
                    // name: '',
                    // description: ''
                },
                showBoardForm: false,
                eventHandled: false
            }
        },
        mounted() {
            this.$store.dispatch('getBoards')
        },
        methods: {
            createBoard() {
                this.newBoard.name = this.newBoard.name.trim();
                if (this.newBoard.name) {
                    this.$store.dispatch('createBoard', this.newBoard)
                    this.showBoardForm = false
                    this.newBoard = {}
                }
            },
            removeBoard(board) {
                this.$store.dispatch('removeBoard', board)
            },
            closeFormListener() {
                if (this.eventHandled) {
                    this.eventHandled = false;
                    return;
                }
                this.showBoardForm = true;
                Vue.nextTick(() => {
                    this.$refs.newBoardName.focus();
                })
                this.outsideClickOrEscapeListener('create-board-parent', () => { this.showBoardForm = false; }, 'open-board-form-btn', (val) => { this.eventHandled = val })
            },
            hideBoardForm() {
                this.showBoardForm = false;
                this.unbindListeners();
            }
        },
        computed: {
            boards() {
                return this.$store.state.boards
            },
            loggedIn() {
                return this.$store.state.loggedIn;
            }
        }
    }

</script>

<style scoped>
    .board-card {
        height: 100px;
        margin-top: 10px;
    }

    #create-board-parent {
        position: fixed;
        bottom: 50%;
        left: 50%;
        transform: translate(-50%, 50%);
    }

    #create-board-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    input {
        margin-bottom: 10px;
    }

    .hidden-children .hidden-child {
        display: none;
    }

    .hidden-children:hover .hidden-child {
        display: initial;
    }
</style>