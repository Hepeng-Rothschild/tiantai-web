import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '../utils/Storage.js'
import Parse from '../utils/Parse.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPartner: getItem('allPartner') || null,
    saleMan: getItem('saleMan') || null,
    user:getItem('user') || null
  },
  mutations: {
    changePartnerData (state,data) {
      state.allPartner = data
    },
    changeSaleMan(state,data) {
      state.saleMan = data
    },
    changeUser(state,data) {
      state.user = data
    }
  },
  actions: {
    // 获取客户
    async getPartner(context) {
      const { data } = await Parse.Cloud.run("getPartner");
      console.log('客户',data)
      context.commit('changePartnerData',data[0])
      setItem("allPartner", data[0]);
    },
    // getSaleMan 获取业务员
    async getSaleMan(context) {
      const {data}  = await Parse.Cloud.run("getSaleMan");
      console.log('业务员',data)
      context.commit('changeSaleMan',data[0])
      setItem("saleMan", data[0]);
    },
    // 获取 token
    async getUser(context) {
      const { data } = await Parse.Cloud.run("login");
      const user = await Parse.User.become(data.sessionToken);
      context.commit('changeUser',data)
      setItem('user',data)
      console.log("我带着token又登录啦", user);
    },
    async logout() {
      const data = await Parse.User.logOut();
      console.log("退出登录", data);
    }
  },
  
})
