import Vue from 'vue'

const actions = {
    refreshTasks({ commit }) {
        Vue.http.get("tasks").then(response => {
            let tasks
            tasks = response.body.tasks;
            commit('updateTasks', tasks);
            console.log(`updated tasks with: ${JSON.stringify(tasks)}`)
        })
    },
    updateTask({ state, commit }, payload) {
        Vue.http.patch(`tasks/${payload.id}`, { status: payload.status }).then(response => {
            commit("updateTasks", state.allTasks)
        })
    },
    saveTask({ state, commit }, newTask) {
        Vue.http.post(`tasks`, newTask).then(response => {
            newTask.id = response.body.id;
            state.allTasks.unshift(newTask);
            commit("updateTasks", state.allTasks)
        });
    },
    removeTask({ state, commit }, taskID) {
        Vue.http.delete(`tasks/${taskID}`).then(response => {
            state.allTasks = state.allTasks.filter(e => e.id != taskID)
            commit("updateTasks", state.allTasks)
        })
    },
}

export default actions
