import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router'
import routes from './router'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
// TODO 登陆验证,获取当前用户信息
const getUserInfo = (): any => {
  // 用户信息
  return {}
}
// TODO 判断用户是否有权限
const checkPermission = (
  to: RouteLocationNormalized,
  userInfo: any
): Boolean => {
  return false
}
// 页面跳转
const turnTo = (
  canTurnTo: Boolean,
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (canTurnTo) {
    next()
  } else {
    // TODO 跳转到指定页面
    next({ replace: true, name: 'helloWord' })
  }
}
router.beforeEach(async (to, from, next) => {
  if (to.meta?.needLogin) {
    let userInfo = await getUserInfo()
    turnTo(checkPermission(to, userInfo), to, from, next)
  } else {
    next()
  }
})
export default router
