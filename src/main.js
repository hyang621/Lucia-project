import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import 'animate.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

require('./mock')

import backend from './utils/backend'
Object.defineProperty(Vue.prototype, '$backend', {
  get() {
    return backend
  }
})
import api from './api/index'
Object.defineProperty(Vue.prototype, '$api', {
  get() {
    return api
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
