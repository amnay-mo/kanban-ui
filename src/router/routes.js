import Vue from 'vue'
import Router from 'vue-router'
import Login from '../Login'
import Board from '../Board'
import store from '../store/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/board',
      name: 'Board',
      component: Board,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next()
        }
        else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        store.dispatch('loadLocalToken')
        if (!store.getters.isAuthenticated) {
          next()
        }
        else {
          next('/board')
        }
      }
    },
    {
      path: '*',
      redirect: '/board'
    }
  ]
})
