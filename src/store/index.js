import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '../utils/Storage.js'
import Parse from '../utils/Parse.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPartner: getItem('allPartner') || null,
    saleMan: getItem('saleMan') || null
  },
  mutations: {
    changePartnerData (state,data) {
      state.allPartner = data
    },
    changeSaleMan(state,data) {
      state.saleMan = data
    }
  },
  actions: {
    // 获取客户
    async getPartner(context) {
      const { data } = await Parse.Cloud.run("getPartner");
      context.commit('changePartnerData',data)
      setItem("allPartner", data);
    },
    // getSaleMan 获取业务员
    async getSaleMan(context) {
      const {data}  = await Parse.Cloud.run("getSaleMan");
      console.log(data)
      context.commit('changeSaleMan',data)
      setItem("saleMan", data);
    },
  },
  
})
