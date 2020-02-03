import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/choose',
    name: 'choose',
    meta: { title: '选择商品' },
    component: () => import( '@/views/NewOrder/Choose.vue')
  },
  {
    path: '/defaultPay',
    name: 'defaultPay',
    meta: { title: '默认收款方式' },
    component: () => import( '@/views/NewOrder/DefaultPay.vue')
  },
  {
    path: '/partnerCreate',
    name: 'partnerCreate',
    meta: { title: '新增客户' },
    component: () => import( '@/views/NewOrder/partnerCreate.vue')
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
    component: () => import( '@/views/orderList')
  },
  {
    path: '/editdraft',
    name: 'editdraft',
    meta: { title: '编辑草稿' },
    component: () => import( '@/views/orderList/EditDraft.vue')
  },
  {
    path: '/draft',
    name: 'draft',
    meta: { title: '草稿' },
    component: () => import( '@/views/orderList/Draft.vue')
  },
  {
    path: '/details',
    name: 'details',
    meta: { title: '订单详情' },
    component: () => import( '@/views/orderList/Details.vue')
  },
  {
    path: '/records',
    name: 'records',
    meta: { title: '订单详情' },
    component: () => import( '@/views/orderList/Records.vue')
  },
  {
    path: '/aide',
    name: 'aide',
    meta: { title: '销售小助手' },
    component: () => import( '@/views/orderList/Aide.vue')
  },
  {
    path: '/NewOrder',
    name: 'NewOrder',
    meta: { title: '新增销售订单' },
    component: () => import( '@/views/NewOrder')
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
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  // if (to.meta.title) {
  //   let head = document.getElementsByTagName('head');
  //   let meta = document.createElement('meta');
  //   meta.title = to.meta.title;
  //   head[0].appendChild(meta)
  // }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
});

export default router
