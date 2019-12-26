import Vue from 'vue'
import VueRouter from 'vue-router'
<<<<<<< HEAD
=======
import Indent from '@/views/Indent'
import Details from '@/views/Indent/Details'
import Records from '@/views/Indent/Details/records.vue'
import Aide from '@/views/Indent/Aide'
import newOrder from '@/views/NewOrder'
import Select from '@/views/NewOrder/select.vue'
import Newly from '@/views/NewOrder/Newly/index.vue'
import DefaultPay from '@/views/NewOrder/Newly/defaultPay.vue'
>>>>>>> 95a3dd2ff9f49934db68c6259f0ae2f212363cb5

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
<<<<<<< HEAD
    meta:{title:'选择商品'},
    component: () => import(/* webpackChunkName: "Choose" */ '@/views/NewOrder/Choose.vue')
=======
    component: () => import(/* webpackChunkName: "about" */ './views/NewOrder/Choose/index.vue')
>>>>>>> 95a3dd2ff9f49934db68c6259f0ae2f212363cb5
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
