import Vue from 'vue'
import App from './App.vue'
import "../plugins"
import "font-awesome/css/font-awesome.min.css"
import axios from './axios' // 引入axios
import router from "./router"
Vue.prototype.$axios = axios; // 把axios挂载到vue上

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
