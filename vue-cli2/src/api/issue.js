import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function informations(type) {
  return request({
    url: '/informations/getByType?token='+getToken(),
    method: 'get',
    params: {
      type
    }
  })
}
