import Cookies from 'js-cookie'
import axios from 'axios'

const baseURL: ENV_PATH = {
  product: '//xxx.product.com',
  daily: '//xxx.daily.com'
}

const instance = axios.create({
  withCredentials: true,
  timeout: 1000,
  baseURL: baseURL['daily']
})

// axios的全局配置
instance.defaults.headers.post = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
instance.defaults.headers.common = {
  'Auth-Type': 'company-web',
  'X-Requested-With': 'XMLHttpRequest',
  token: Cookies.get('token')
}

// 添加请求拦截器(post只能接受字符串类型数据)
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const errorHandle = (status: number, other: string) => {
  switch (status) {
    case 400:
      console.error('信息校验失败')
      break
    case 401:
      console.error('认证失败')
      break
    case 403:
      console.error('token校验失败')
      break
    case 404:
      console.error('请求的资源不存在')
      break
    default:
      console.error(other)
      break
  }
}

// 添加响应拦截器
instance.interceptors.response.use(
  // 响应包含以下信息data,status,statusText,headers,config
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  err => {
    console.error(err)
    const { response } = err
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response)
    }
    console.error('请求失败')
    return true
  }
)

export default instance
