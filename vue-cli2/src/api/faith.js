import request from '@/utils/request'

export function faith() {
  return request({
    url: '/bonds/show',
    method: 'get',
  })
}

export function agreement(){
  return request({
    url: '/bonds/protocol',
    method: 'get',
  })
}
