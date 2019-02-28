import axios from 'axios'
import qs from 'qs'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

service.defaults.transformRequest = function (data) {
  data = qs.stringify(data)
  return data
};

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImRldmljZV9pZCI6IjEiLCJkYXRlIjoxNTUxMjQwMDI4fQ.l-HC8oQu7C_GkjXX4lQ_cFDIC02UMWE8IcgU3ryRQ1M31lmTa5RsC6_0OxS3Sa2us5XdvKl9xbUavlZvh3FJk1153V7XvIyR4XTPW_xUpiwaOGohb2AQSxOUVwIkPoaffOQFSOfGWWgnb1OOFGqTn4gm9sEkhiotgRrXg3q6v6Q"
// // request拦截器
service.interceptors.request.use(
  config => {
    config.headers.Authorization = token;
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错
     */
    const res = response.data;
    if (res.errorCode !== 200) {
      if (res.errorCode == '24004'||res.errorCode=='24005'){
        return response.data
      }
      if (res.errorCode === 21314 || res.errorCode === 21315 || res.errorCode === 21316 || res.errorCode === 21317) {
        console.log('报错')
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
