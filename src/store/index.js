import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '../utils/Storage.js'
import Parse from '../utils/parse.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:getItem('user') || null,
    SaleOrderDetails:null,
  },
  mutations: {
    changeUser(state,data) {
      state.user = data
    },
    selectGoods(state,data) {
      console.log(state,data)
      state.SaleOrderDetails = data
    }
  },
  actions: {
    // 获取 token
    async login(context) {
      const { data } = await Parse.Cloud.run("login",{username:'hhp',password:'123456'});
      console.log('登录')
      context.commit('changeUser',data)
      setItem('user',data)
      
    },
    async keepLogin(context) {
      const user = await Parse.User.become(context.state.user.sessionToken);
      console.log("我带着token又登录啦",user);
    },
    async logout() {
      await Parse.User.logOut();
      console.log("退出登录");
    },
    
  },
  
})
