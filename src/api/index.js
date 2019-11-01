import axios from 'axios'
import local from '@/utils/local.js'
import router from '@/router/index.js'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.interceptors.request.use((config) => {
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => res, err => {
  if (err.response.status === 401) {
    router.push('/login')
  }
})
export default axios