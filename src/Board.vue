<template>
<section class="section" id="board">
  <div class="container">
    <input class="input is-large" type="text" v-model="newTaskText" @keyup.enter="addTask"/>
    <hr>
    <div class=columns>
      <div class="column status-1">
        <div class="tags has-addons">
          <span class="tag">To Do</span>
          <span class="tag is-dark">{{ tasksToDo.length }}</span>
        </div>
          <task-card :task="task" v-for="task in tasksToDo" :key="task.id"></task-card>
      </div>
      <div class="column status-2">
        <div class="tags has-addons">
          <span class="tag">In Progress</span>
          <span class="tag is-dark">{{ tasksInProgress.length }}</span>
        </div>
          <task-card :task="task" v-for="task in tasksInProgress" :key="task.id"></task-card>
      </div>
      <div class="column status-3">
        <div class="tags has-addons">
          <span class="tag">Done</span>
          <span class="tag is-dark">{{ tasksDone.length }}</span>
        </div>
          <task-card :task="task" v-for="task in tasksDone" :key="task.id"></task-card>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import TaskCard from "./TaskCard.vue";
export default {
  components: {
    "task-card": TaskCard
  },
  data() {
    return {
      newTaskText: "",
      tasks: []
    };
  },
  computed: {
    tasksDeleted() {
      return this.tasks.filter(task => task.status == 0);
    },
    tasksToDo() {
      return this.tasks.filter(task => task.status == 1);
    },
    tasksInProgress() {
      return this.tasks.filter(task => task.status == 2);
    },
    tasksDone() {
      return this.tasks.filter(task => task.status == 3);
    }
  },
  created: function() {
    this.getTasks();
  },
  methods: {
    postTask(task) {
      return this.$http.post("tasks", task).then(response => {
        let newID = response.body.id;
        console.log(`Got POST response: ${newID}`);
        return newID;
      });
    },
    deleteTask(task) {
      this.$http.delete("tasks" + task.id);
    },
    getTasks() {
      this.$http.get("tasks").then(response => {
        this.tasks = response.body.tasks;
      });
    },
    addTask() {
      if (this.newTaskText != "") {
        var newTask = {
          text: this.newTaskText,
          status: 1
        };
        this.postTask(newTask).then(newTaskID => {
          newTask.id = newTaskID;
          this.tasks.unshift(newTask);
          this.newTaskText = "";
        });
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
