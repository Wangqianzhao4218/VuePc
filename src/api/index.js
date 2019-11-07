import axios from 'axios'
import local from '@/utils/local.js'
import router from '@/router/index.js'
import JSONBIG from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  // 对data进行格式转换  data就是后台响应的json字符串
  // 如果没数据呢？data === null 使用JSONBIG.parse(null) 报错
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
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
