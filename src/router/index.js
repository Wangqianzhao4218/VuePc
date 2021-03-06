import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home/index.vue'
import Welcome from '@/views/welcome/index.vue'
import notFound from '@/views/404'
import local from '@/utils/local.js'
import Active from '@/views/active'
import Publish from '@/views/publish'
import Image from '@/views/image'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Setting from '@/views/setting'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 登录
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: '',
        component: Welcome
      },
      {
        path: '/article',
        component: Active
      },
      {
        path: '/publish',
        component: Publish
      },
      {
        path: '/image',
        component: Image
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/fans',
        component: Fans
      },
      {
        path: '/setting',
        component: Setting
      }
      ]
    },
    {
      path: '*',
      component: notFound
    }
  ]
})
router.beforeEach((to, from, next) => {
  const user = local.getUser()
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
