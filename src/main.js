import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource)
Vue.http.options.root = "https://kanban.amnay.fr/api/v1"
new Vue({
  el: '#app',
  render: h => h(App)
})
