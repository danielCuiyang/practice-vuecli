import request from '@/utils/request'

export function getList(form) {
  return request({
    url: '/trademark/relationList',
    method: 'get',
    params:{
      type:form.type,
      page:form.page,
      keyword:form.keyword
    }
  })
}


export function getDetail(apply_no,trademark_type) {
  return request({
    url: '/trademark/detail',
    method: 'post',
    data:{
      apply_no,
      trademark_type,
    }
  })
}

export function toaudit(form) {
  return request({
    url: '/registrants/get',
    method: 'get',
    params:{
      page:form.page,
      pagesize:form.pagesize,
      type:form.type,
      registrant_hash:form.registrant_hash,
      trademark_type:form.trademark_type,
      keyword:form.keyword
    }
  })
}
