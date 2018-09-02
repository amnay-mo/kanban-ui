const mutations = {
    updateTasks(state, payload) {
        state.allTasks = payload
        state.tasksToDo = {}
        state.tasksInProgress = {}
        state.tasksDone = {}
        state. allTasks.forEach(task => {
            switch (task.status) {
                case 1:
                    state.tasksToDo[task.id] = task
                    break
                case 2:
                    state.tasksInProgress[task.id] = task
                    break
                case 3:
                    state.tasksDone[task.id] = task
                    break
            }
        });
    }
}

export default mutations
