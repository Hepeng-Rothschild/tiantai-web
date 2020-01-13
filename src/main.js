import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './utils/rem'
import 'amfe-flexible/index.js'
import './styles/index.less'

import Parse from './utils/parse.js'
Vue.prototype.$Parse = Parse
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$Parse = Parse
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
