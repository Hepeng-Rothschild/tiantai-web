import Vue from 'vue'
import VueRouter from 'vue-router'
import Indent from '@/views/Indent'
import Details from '@/views/Indent/Details'
import Records from '@/views/Indent/Details/records.vue'
import Aide from '@/views/Indent/Aide'
import newOrder from '@/views/newOrder'
import New from '@/views/Indent/Details/new.vue'

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
    path: '/New',
    name: 'New',
    component: New,New
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
