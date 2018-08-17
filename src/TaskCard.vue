<template>
<div class="card">
    <div class="card-content">
        {{ task.text }}
    </div>
    <footer class="card-footer">
        <a class="card-footer-item" @click="decrementTask"><</a>
        <a class="card-footer-item" @click="incrementTask">></a>
        <a class="card-footer-item delete-button" @click="deleteTask">X</a>
    </footer>
    </div>
</template>

<script>
export default {
    props: ['task'],
    methods: {
        incrementTask() {
            if (this.task.status <= 2) {
                this.task.status += 1
                this.$http.patch(`tasks/${this.task.id}`, {status: this.task.status})
                this.$emit('horizontalMove', 'right')
            }
        },
        decrementTask() {
            if (this.task.status >= 2) {
                this.task.status -= 1
                this.$http.patch(`tasks/${this.task.id}`, {status: this.task.status})
                this.$emit('horizontalMove', 'left')
            }
        },
        deleteTask() {
            this.task.status = 0
            this.$http.delete(`tasks/${this.task.id}`)
            this.$emit('removal')
        }
    }
}
</script>

<style lang="scss" scoped>


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
  margin-left: 2px;
  margin-right: 2px;
}
.card-footer-item {
  font-size: 14px;
}
.card-footer {
    margin-top: 0px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.delete-button {
    color: red;
}
</style>
