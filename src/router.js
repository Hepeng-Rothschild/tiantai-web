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
    path: '/newly',
    name: 'newly',
    meta: { title: '新增客户' },
    component: () => import( '@/views/NewOrder/Newly.vue')
  },
  {
    path: '/selectpartner',
    name: 'selectpartner',
    meta: { title: '选择客户' },
    component: () => import('@/views/NewOrder/SelectPartner.vue')
  },
  {
    path: '/selectsaleman',
    name: 'selectsaleman',
    meta: { title: '选择业务员' },
    component: () => import('@/views/NewOrder/SelectSaleman.vue')
  },
  {
    path: '/indent',
    name: 'indent',
    meta: { title: '销售订单' },
    component: () => import( '@/views/Indent')
  },
  {
    path: '/editdraft',
    name: 'editdraft',
    meta: { title: '编辑草稿' },
    component: () => import( '@/views/Indent/EditDraft.vue')
  },
  {
    path: '/draft',
    name: 'draft',
    meta: { title: '草稿' },
    component: () => import( '@/views/Indent/Draft.vue')
  },
  {
    path: '/details',
    name: 'details',
    meta: { title: '订单详情' },
    component: () => import( '@/views/Indent/Details.vue')
  },
  {
    path: '/records',
    name: 'records',
    meta: { title: '订单详情' },
    component: () => import( '@/views/Indent/Records.vue')
  },
  {
    path: '/aide',
    name: 'aide',
    meta: { title: '销售小助手' },
    component: () => import( '@/views/Indent/Aide.vue')
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
