import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App.vue'
require('../node_modules/bulma/bulma.sass')

import store from './store/store'

Vue.use(VueResource)
// Vue.http.options.root = "https://kanban.amnay.fr/api/v1"
Vue.http.options.root = "http://localhost:9000/api/v1"
new Vue({
  el: '#app',
  render: h => h(App),
  store
})
