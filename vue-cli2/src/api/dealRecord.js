import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function deal_logs(query) {
  return request({
    url: '/deal_logs?token='+getToken(),
    method: 'get',
    params: {
      page:query.page,
      page_size:query.page_size,
      keyword:query.keyword
    }
  })
}
