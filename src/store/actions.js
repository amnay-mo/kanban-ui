import Vue from 'vue'
import VueJwtDecode from 'vue-jwt-decode'

import router from '../router/routes'

const actions = {
    refreshTasks({ commit }) {
        Vue.http.get("tasks").then(response => {
            let tasks
            tasks = response.body.tasks;
            commit('updateTasks', tasks);
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
    loadLocalToken({ commit }) {
        let token = localStorage.getItem("jwtToken")
        if (token) {
            commit("updateToken", token)
            console.log("token successfully loaded from local storage")
            Vue.http.headers.common["Authorization"] = "Bearer " + token
        }
        else {
            console.log("no token found in local storage")
        }
    },
    checkToken({ state, commit }) {
        if (state.token != null) {
            let decodedToken = VueJwtDecode.decode(state.token)
            let tokenExpirationTime = decodedToken.exp
            let currentTime = Math.round((new Date().getTime()) / 1000)
            if (tokenExpirationTime <= currentTime) {
                console.log(`token expired: ${tokenExpirationTime} < ${currentTime}`)
                // remove token
                commit('updateToken', null)
                localStorage.removeItem("jwtToken")
                console.log('token removed from local storage')
            }
            else {
                console.log(`token is still valid. expires at ${tokenExpirationTime}`)
            }
        }
    },
    authenticate({ commit }, credentials) {
        let email = credentials.email
        let password = credentials.password
        Vue.http.post('auth', { email, password }).then(response => {
            console.log("login successful")
            commit("updateToken", response.body.token)
            localStorage.setItem("jwtToken", response.body.token)
            Vue.http.headers.common["Authorization"] = "Bearer " + response.body.token
            router.push('/')
        }, response => {
            console.log("login failed")
        })
    }
}

export default actions
