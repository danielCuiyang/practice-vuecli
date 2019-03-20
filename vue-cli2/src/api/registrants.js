
import request from '@/utils/request'
export function registrantsGet(form) {
  return request({
    url: '/registrants/get',
    method: 'get',
    params:{
        page:form.page,
        pagesize:form.pagesize,
        type:1,
        registrant_hash:form.registrant_hash,
        trademark_type:form.trademark_type,
        keyword:form.keyword
    }
  })
}
export function released(data) {
  return request({
    url: 'registrants/released',
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    data:JSON.stringify(data)
  })
}