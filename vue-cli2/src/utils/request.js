import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'
import { getToken,setToken } from '@/utils/auth'
import {urlParam} from '@/utils/url.js'
import {vm} from '@/main'
var token =  urlParam.token
var device_id = urlParam.device_id
var timestamp = parseInt(new Date().getTime()/1000);
var appkey = '7EoYU04WiaaY^qkHOP*%dc@*LNVnN1NK';

var signGenerate = (data) => {
  let ret = [];
  for (let it in data) {
    let val = data[it];
    ret.push(it + '='+val);
  }
  ret.sort();
  let res = encodeURI(ret.join('&'))+'&appkey='+appkey
  return md5(res)
};

if(token){
  setToken('token',token)
}else{
  token = getToken("token")
}
if(device_id){
  setToken('device_id',device_id)
}else{
  device_id = getToken("device_id")
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  // timeout: 5000, // 请求超时时间,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params: {
    device_id,
    timestamp
  },
})
var configs;
service.defaults.transformRequest = function (data) {
  let requestMethod = configs.method.toUpperCase()
  let contentType = configs.headers['Content-Type'];
  if(requestMethod == 'GET'){
    configs.params['sign']= signGenerate(configs.params);
    return;
  }
  if(!data){
    data = {}
  }

  if(contentType =='application/x-www-form-urlencoded'){
    var xdata = Object.assign({},data)
    xdata.device_id = device_id;
    xdata.timestamp = timestamp;
    var signs = signGenerate(xdata);
    data.sign = signs
    data = qs.stringify(data);
  }else if(contentType == "application/json"){
    configs.params['sign']= signGenerate(configs.params);
  }
  else{
    var newData = {
      device_id,
      timestamp,
      source_type:"3",
      rank:data.get('rank')
    };
    configs.params['sign']= signGenerate(newData);
  }
  return data;
};
// request拦截器
service.interceptors.request.use(
  config => {
    config.headers.Authorization = token;
    configs = config;
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
    if (res.errorCode != 200) {
      if(res.errorCode == '24004'||res.errorCode=='24005'){
        return response.data
      }
      if (res.errorCode === 21314 || res.errorCode === 21315 || res.errorCode === 21316 || res.errorCode === 21317) {
        console.log('报错')
      }
      vm.$toast.show({
        text:res.message,
        type:'cancel'
      })
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    vm.$toast.show({
      text:error.message,
      type:'cancel'
    })
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
