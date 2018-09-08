<template>
  <div class="container">
    <input class="input is-large" type="text" v-model="newTaskText" @keyup.enter="addTask"/>
    <hr>
    <div class=columns>
      <div class="column status-1">
        <div class="tags has-addons">
          <span class="tag">To Do</span>
          <span class="tag is-dark">{{ Object.keys(tasksToDo).length }}</span>
        </div>
          <task-card :task="task" v-for="(task, taskID) in tasksToDo" :key="taskID"></task-card>
      </div>
      <div class="column status-2">
        <div class="tags has-addons">
          <span class="tag">In Progress</span>
          <span class="tag is-dark">{{ Object.keys(tasksInProgress).length }}</span>
        </div>
          <task-card :task="task" v-for="(task, taskID) in tasksInProgress" :key="taskID"></task-card>
      </div>
      <div class="column status-3">
        <div class="tags has-addons">
          <span class="tag">Done</span>
          <span class="tag is-dark">{{ Object.keys(tasksDone).length }}</span>
        </div>
          <task-card :task="task" v-for="(task, taskID) in tasksDone" :key="taskID"></task-card>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard.vue";

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    "task-card": TaskCard
  },
  data() {
    return {
      newTaskText: ""
    };
  },
  computed: {
    ...mapState([
      "tasksToDo",
      "tasksInProgress", 
      "tasksDone"
      ]),
  },
  created: function() {
    this.refreshTasks()
  },
  methods: {
    ...mapActions([
      "refreshTasks",
      "saveTask"
    ]),
    postTask(task) {
      return this.$http.post("tasks", task).then(response => {
        let newID = response.body.id;
        console.log(`Got POST response: ${newID}`);
        return newID;
      });
    },
    addTask() {
      if (this.newTaskText != "") {
        var newTask = {
          text: this.newTaskText,
          status: 1
        };
        this.saveTask(newTask)
        this.newTaskText = "";
      }
    }
  }
};

</script>

<style lang="scss" scoped>
.input {
  font-family: "C64";
  text-align: center;
  width: 100%;
  border-color: chocolate;
}
.status-1 {
  background-color: #ed8077;
}
.status-2 {
  background-color: #4488c5;
}
.status-3 {
  background-color: #5eb5a6;
}
.card {
  margin-bottom: 5px;
}
.card-footer-item {
  padding-top: 0px;
  padding-bottom: 0px;
}

</style>
