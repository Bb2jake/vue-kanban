<template>
  <div>
    <div class="panel panel-default list-card">
      <h4 class="panel-header"><strong>{{list.name}}:</strong> {{list.description}}</h4>
      <div v-for="task in list.tasks">
        <Task :task="task"></Task>

      </div>
      <div class="panel-body">
        <div class="panel panel-default">
          <form @submit.prevent="createTask(list._id)">
            <input type="text" placeholder="task" v-model="newTask.name">
            <button class="btn btn-default">Create Task</button>
          </form>
        </div>
      </div>
      <span class="glyphicon glyphicon-trash" @click="removeList(list)"></span>
    </div>
  </div>
</template>


<script>
  import Task from './Task'
  export default {
    components: {
      Task
    },
    props: ['list'],
    data() {
      return {
        newTask: {
          // name: '',
          // description: ''
        },
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
          this.$store.dispatch('createTask', this.newTask);
          this.newTask = {};
        }
      },
    }
  }

</script>


<style>


</style>
