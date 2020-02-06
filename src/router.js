import Vue from 'vue'
import VueRouter from 'vue-router'
import Parse from './utils/parse.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/choose',
    name: 'choose',
    meta: { title: '选择商品' },
    component: () => import('@/views/NewOrder/Choose.vue')
  },
  {
    path: '/defaultPay',
    name: 'defaultPay',
    meta: { title: '默认收款方式' },
    component: () => import('@/views/NewOrder/DefaultPay.vue')
  },
  {
    path: '/partnerCreate',
    name: 'partnerCreate',
    meta: { title: '新增客户' },
    component: () => import('@/views/NewOrder/partnerCreate.vue')
  },
  {
    path: '/partnerList',
    name: 'partnerList',
    meta: { title: '选择客户' },
    component: () => import('@/views/NewOrder/partnerList.vue')
  },
  {
    path: '/salemanList',
    name: 'salemanList',
    meta: { title: '选择业务员' },
    component: () => import('@/views/NewOrder/salemanList.vue')
  },
  {
    path: '/orderList',
    name: 'orderList',
    meta: { title: '销售订单' },
    component: () => import('@/views/OrderList')
  },
  {
    path: '/editdraft',
    name: 'editdraft',
    meta: { title: '编辑草稿' },
    component: () => import('@/views/OrderList/EditDraft.vue')
  },
  {
    path: '/draft',
    name: 'draft',
    meta: { title: '草稿' },
    component: () => import('@/views/OrderList/Draft.vue')
  },
  {
    path: '/details',
    name: 'details',
    meta: { title: '订单详情' },
    component: () => import('@/views/OrderList/Details.vue')
  },
  {
    path: '/records',
    name: 'records',
    meta: { title: '订单详情' },
    component: () => import('@/views/OrderList/Records.vue')
  },
  {
    path: '/aide',
    name: 'aide',
    meta: { title: '销售小助手' },
    component: () => import('@/views/OrderList/Aide.vue')
  },
  {
    path: '/neworder',
    name: 'neworder',
    meta: { title: '新增销售订单' },
    component: () => import('@/views/NewOrder')
  },
  {
    path: '/info',
    name: 'info',
    meta: { title: '常用信息' },
    component: () => import('@/views/Info/Info.vue')
  },
  {
    path: '/bank',
    name: 'bank',
    meta: { title: '公司银行账号' },
    component: () => import('@/views/Info/InfoBank.vue')
  },
  {
    path: '/phone',
    name: 'phone',
    meta: { title: '联系方式' },
    component: () => import('@/views/Info/InfoPhone.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    meta: { title: '公告', right: '设置订阅', url: '/setting' },
    component: () => import('@/views/Notice/Notice.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: { title: '订阅设置' },
    component: () => import('@/views/Notice/Setting.vue')
  },
  {
    path: '/ordertips',
    name: 'ordertips',
    meta: { title: '采购提醒' },
    component: () => import('@/views/Notice/OrderTips.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    meta: { title: '发布公告' },
    component: () => import('@/views/Notice/Publish.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    meta: { title: '库存查询' },
    component: () => import('@/views/Inventory/Inventory.vue')
  },
  {
    path: '/detailinfo',
    name: 'detailinfo',
    meta: { title: '库存查询' },
    component: () => import('@/views/Inventory/DetailInfo.vue')
  },
  {
    path: '/remind',
    name: 'remind',
    meta: { title: '应收账款', icon: true },
    component: () => import('@/views/Remind/Remind.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {

  try {
    let result = await Parse.Cloud.run("checkUser")
    if (result.code == 404) {
      return window.location.href = process.env.VUE_APP_LOGIN_URL+'?path='+ to.name;
    }
  }catch(e){
    return window.location.href = process.env.VUE_APP_LOGIN_URL+'?path='+ to.name;
  }
  
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
});

export default router
