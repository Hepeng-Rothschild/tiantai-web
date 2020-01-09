import Vue from 'vue'
import Vuex from 'vuex'
import Parse from '../utils/parse.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    SaleOrderDetails:null,
    OrderMessage:null,
    SelectedPartner:null,
    SelectedSaleMan:null,
  },
  mutations: {
    selectGoods(state,data) {
      state.SaleOrderDetails = data
    },
    saveOrderMessage(state,data) {
      state.OrderMessage = data
    },
    saveSelectedPartner(state,data) {
      state.SelectedPartner = data
    },
    saveSelectedSaleMan(state,data) {
      state.SelectedSaleMan = data
    },
  },
  actions: {
    // 获取 token
    async login(context) {
      const { data } = await Parse.Cloud.run("login",{username:'wca',password:'123456'});
      console.log('登录')
      const user = await Parse.User.become(data.sessionToken);
      console.log("我带着token又登录啦",user);
    },
   
    async logout() {
      await Parse.User.logOut();
      console.log("退出登录");
    },

  },

})
