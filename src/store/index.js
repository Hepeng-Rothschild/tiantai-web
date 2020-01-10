import Vue from 'vue'
import Vuex from 'vuex'
import {
  setItem,
  getItem
} from '../utils/Storage.js'
import Parse from '../utils/parse.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    saleOrderDetails: null,
    savePartners: null,
    defaultPay: {
      radio: null,
      saleCreditDays: null,
      aleStartDate: null,
      saleSpaceMonth: null,
      saleCheckMonth: null,
      saleCheckDate: null
    }
  },
  mutations: {
    selectGoods(state, data) {
      console.log(state, data)
      state.saleOrderDetails = data
    },
    savePartners(state, data) {
      state.savePartners = data
    },
    savePay(state, data) {
      state.defaultPay = data
    }
  },
  actions: {
    // 获取 token
    async login(context) {
      const {
        data
      } = await Parse.Cloud.run("login", {
        username: 'hhp',
        password: '123456'
      });
      console.log('登录')
      const user = await Parse.User.become(data.sessionToken);
      console.log("我带着token又登录啦", user);

    },

    async logout() {
      await Parse.User.logOut();
      console.log("退出登录");
    },

  },

})
