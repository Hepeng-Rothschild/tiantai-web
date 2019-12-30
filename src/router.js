import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/indent',
  //   name: 'indent',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Indent')
  // }
  {
    path: '/choose',
    name: 'choose',
    meta:{title:'选择商品'},
    component: () => import(/* webpackChunkName: "Choose" */ '@/views/NewOrder/Choose.vue')
  },
  {
    path: '/defaultPay',
    name: 'defaultPay',
    meta:{title:'默认收款方式'},
    component: () => import(/* webpackChunkName: "DefaultPay" */ '@/views/NewOrder/DefaultPay.vue')
  },
  {
    path: '/newly',
    name: 'newly',
    meta:{title:'新增客户'},
    component: () => import(/* webpackChunkName: "Newly" */ '@/views/NewOrder/Newly.vue')
  },
  {
    path: '/select',
    name: 'select',
    meta:{title:'新增销售订单'},
    component: () => import(/* webpackChunkName: "Select" */ '@/views/NewOrder/select.vue')
  },
  {
    path: '/indent',
    name: 'indent',
    meta:{title:'销售订单'},
    component: () => import(/* webpackChunkName: "Indent" */ '@/views/Indent')
  },
  {
    path: '/details',
    name: 'details',
    meta:{title:'订单详情'},
    component: () => import(/* webpackChunkName: "Details" */ '@/views/Indent/Details.vue')
  },
  {
    path: '/records',
    name: 'records',
    meta:{title:'订单详情'},
    component: () => import(/* webpackChunkName: "Records" */ '@/views/Indent/Records.vue')
  },
  {
    path: '/aide',
    name: 'aide',
    meta:{title:'销售小助手'},
    component: () => import(/* webpackChunkName: "Aide" */ '@/views/Indent/Aide.vue')
  },
  {
    path: '/neworder',
    name: 'neworder',
    meta:{title:'新增销售订单'},
    component: () => import(/* webpackChunkName: "Neworder" */ '@/views/NewOrder')
  },
  // ----------------------------------------------
  {
    path: '/info',
    name: 'info',
    meta:{title:'常用信息'},
    component: () => import(/* webpackChunkName: "Neworder" */ '@/views/Info/Info.vue')
  },
  {
    path: '/bank',
    name: 'bank',
    meta:{title:'公司银行账号'},
    component: () => import(/* webpackChunkName: "Neworder" */ '@/views/Info/InfoBank.vue')
  },
  {
    path: '/phone',
    name: 'phone',
    meta:{title:'联系方式'},
    component: () => import(/* webpackChunkName: "Neworder" */ '@/views/Info/InfoPhone.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    meta:{title:'公告',right:'设置订阅',url:'/setting'},
    component: () => import(/* webpackChunkName: "Neworder" */ '@/views/Notice/Notice.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta:{title:'订阅设置'},
    component: () => import(/* webpackChunkName: "Neworder" */ '@/views/Notice/Setting.vue')
  },
  {
    path: '/ordertips',
    name: 'ordertips',
    meta:{title:'采购提醒'},
    component: () => import( '@/views/Notice/OrderTips.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    meta:{title:'发布公告'},
    component: () => import( '@/views/Notice/Publish.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    meta:{title:'库存查询'},
    component: () => import( '@/views/Inventory/Inventory.vue')
  },
  {
    path: '/detailinfo',
    name: 'detailinfo',
    meta:{title:'库存查询'},
    component: () => import( '@/views/Inventory/DetailInfo.vue')
  },
  // {
  //   path: '/remind',
  //   name: 'remind',
  //   meta:{title:'应收账款',icon:true},
  //   component: () => import( '@/views/Remind/Remind.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
