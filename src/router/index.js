import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home/index.vue'
import Welcome from '@/views/welcome/index.vue'
import notFound from '@/views/404'
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
      }]
    },
    {
      path: '*',
      component: notFound
    }
  ]
})
export default router
