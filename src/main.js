import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './utils/rem'
import 'amfe-flexible/index.js'
import './styles/common.less'
import Parse from './utils/parse.js'
// let parseCloudRun =  Parse.Cloud.run
// Parse.Cloud.run = async function(name , data, session){
//   try{
//     let result = await parseCloudRun(name, data, session)
//     if(result.code == 404){
      
//     }
//   }catch(e){
//     if(e.code == 209 ||e.code == 404){
//       window.location.href = process.env.VUE_APP_loginURl
//     }
//   }
//   return result
// }


Vue.prototype.$Parse = Parse

Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$Parse = Parse
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
