import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function login(login_name, password) {
  return request({
    url: '/users/signin',
    method: 'post',
    data: {
      login_name,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/users/getAuthorityList?token='+getToken(),
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
