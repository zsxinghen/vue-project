import { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      keepAlive: true,
      needLogin: false, // 是否需要登陆
      access: ['VISITOR'] // 用户权限
    },
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/views/home/index.vue')
  },
  {
    path: '/helloWord',
    name: 'helloWord',
    meta: {
      keepAlive: false
    },
    component: () => import('@/components/HelloWorld.vue')
  }
]

export default routes
