import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 商标列表
export function trademarks(query) {
  return request({
    url: '/trademarks?token=' + getToken(),
    method: 'get',
    params: {
      page: query.page,
      page_size: query.limit,
      tm_name: query.tm_name,
      tm_genre: query.tm_genre,
      tm_property: query.tm_property.join(','),
      tm_price_start: query.tm_price_start,
      tm_price_end: query.tm_price_end,
      tm_word_number: query.tm_word_number.join(','),
      tm_cluster: query.tm_cluster.join(','),
      tm_cluster_type: query.tm_cluster_type,
      tm_limitation: query.tm_limitation.join(','),
      tm_limitation_type: query.tm_limitation_type,
      tm_is_reserve:query.tm_is_reserve?1:0
    }
  })
}
// 商标预留
export function reservelogs(form) {
  return request({
    url: '/reserve_logs/add?token=' + getToken(),
    method: 'post',
    data: {
      id: form.id,
      content: form.content
    }
  })
}

// 取消商标预留
export function cancelreservelogs(reserve_id) {
  return request({
    url: '/reserve_logs/cancelReserve?token=' + getToken(),
    method: 'post',
    data: {
      reserve_id
    }
  })
}

// 类似群组
export function getGroup(id) {
  return request({
    url: '/trademarks/getGroups?token=' + getToken(),
    method: 'get',
    params: {
      id
    }
  })
}

// 商标预留列表
export function sbreserved(query) {
  return request({
    url: '/reserve_logs?token=' + getToken() + '&' + Date.parse(new Date()),
    method: 'get',
    params: {
      id: query.id,
      keyword: query.keyword,
      page: query.page,
      page_size: query.limit
    }
  })
}

// 修改过期时间
export function expireTime(reserve_id, expire_at) {
  return request({
    url: '/reserve_logs/expireTime?token=' + getToken(),
    method: 'post',
    data: {
      reserve_id,
      expire_at
    }
  })
}

// 新增成交记录
export function maksbreserved(reserve_id) {
  return request({
    url: '/deal_logs/addDeal?token=' + getToken(),
    method: 'post',
    data: {
      reserve_id
    }
  })
}

// 新增跟进记录
export function addfollowUps(reserve_id, content) {
  return request({
    url: '/reserve_logs/addfollowUp?token=' + getToken(),
    method: 'post',
    data: {
      reserve_id,
      content
    }
  })
}
