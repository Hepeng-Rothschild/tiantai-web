import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './utils/rem'
import 'amfe-flexible/index.js'
import './styles/index.less'
<<<<<<< HEAD
import Parse from './utils/parse.js' 
=======

import Parse from './utils/Parse.js'
Vue.prototype.$Parse = Parse

>>>>>>> 7ebbf9d7233ecd70dd7b321210325dbba565d004
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$Parse = Parse
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
