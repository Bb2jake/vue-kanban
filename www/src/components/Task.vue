<template>
  <div>
    <p><span class="action" @click="toggleComments">{{task.name}}</span> <span class="glyphicon glyphicon-trash" @click="removeTask"></span></p>
    <div v-show = "showComments">
      <ul>
        <li v-for = "comment in task.comments"> {{comment.body}} - {{comment.creatorName}}</li>
      </ul>
    </div>
  </div>
</template>


<script>
  export default {
    props: ['task'],
    data(){
      return {
        showComments: false,
      
      }
    },
    methods: {
      removeTask() {
        this.$store.dispatch('removeTask', this.task)
      },
      toggleComments(){
        if (!this.task.comments){
          this.$store.dispatch('getComments', this.task._id)
        }
        this.showComments = !this.showComments;
      }
    }
  }

</script>


<style>


</style>
