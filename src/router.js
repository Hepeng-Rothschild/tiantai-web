import Vue from 'vue'
import VueRouter from 'vue-router'
import Indent from '@/views/Indent'
import Details from '@/views/Indent/Details'
import Records from '@/views/Indent/Details/records.vue'
import Aide from '@/views/Indent/Aide'
import newOrder from '@/views/NewOrder'
import Select from '@/views/NewOrder/select.vue'
import Newly from '@/views/NewOrder/Newly/index.vue'
import DefaultPay from '@/views/NewOrder/Newly/defaultPay.vue'

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
    component: () => import(/* webpackChunkName: "about" */ './views/NewOrder/Choose/index.vue')
  },
  {
    path: '/defaultPay',
    name: 'defaultPay',
    component: DefaultPay
  },
  {
    path: '/newly',
    name: 'newly',
    component: Newly
  },
  {
    path: '/select',
    name: 'select',
    component: Select
  },
  {
    path: '/indent',
    name: 'indent',
    component: Indent,
  },
  {
    path: '/details',
    name: 'details',
    component: Details
  },
  {
    path: '/records',
    name: 'records',
    component: Records
  },
  {
    path: '/aide',
    name: 'aide',
    component: Aide
  },
  {
    path: '/neworder',
    name: 'neworder',
    component: newOrder
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
