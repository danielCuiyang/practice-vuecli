/*
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import axios from 'axios'
//根据类型获取最新一条公告
export function informations(type) {
  return request({
    url: '/informations/getByType?token='+getToken(),
    method: 'get',
    params: {
      type
    }
  })
}
// 公告列表
export function informationslist(page,page_size) {
  return request({
    url: '/informations?token='+getToken()+'&'+Date.parse(new Date()),
    method: 'get',
    params: {
      page,
      page_size
    }
  })
}
//添加公告
export function addinformations(form) {
  return request({
    url: '/informations/add?token='+getToken(),
    method: 'post',
    data: {
      title:form.title,
      type:form.type,
      content:form.content
    }
  })
}

//编辑公告
export function redactInformations(form) {
  var data={
    title:form.title,
    type:form.type,
    content:form.content
  }, url=process.env.BASE_API+'informations/edit/'+Number(form.id)+'?token='+getToken();
  return axios.put(url,data)
}

//删除公告
export function deleteInformations(id) {
  return request({
    url: '/informations/delete/'+Number(id)+'?token='+getToken(),
    method: 'delete',
  })
}

//.vue 文件引用及使用
import { informationslist, addinformations, redactInformations, deleteInformations } from '@/api/content'
informationslist(this.listQuery.page, this.listQuery.limit).then(res => {
  this.informations = res.data
  this.total = Number(res.total)
  this.loading = false
})
*/
