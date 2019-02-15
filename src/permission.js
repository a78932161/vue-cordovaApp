import router from './router'
import {getToken} from '@/common/js/auth' // 验权
import wu from '@/common/wu-ui/wu-ui';


const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      wu.showToast({
        title: '验证过期!',
        mask: false,
        duration: 2000
      });
      next('/login')
    }
  }
})
