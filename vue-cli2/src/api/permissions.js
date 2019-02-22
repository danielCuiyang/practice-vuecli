import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import axios from 'axios'

// 获取权限列表
export function getLimitList() {
  return request({
    url: '/permissions?token=' + getToken(),
    method: 'get',
    params: {
      // permission_id: '0'
    }
  })
}
// 编辑权限
export function editLimit(form) {
  var data = {
      permission_name: form.permission_name,
      permission_key: form.permission_key,
      route: form.route,
      menubar: form.menubar,
      permission_id: form.permission_id,
      actived: form.actived
    }, url = process.env.BASE_API + '/permissions/edit/' + Number(form.id) + '?token=' + getToken()
  return axios.put(url, data)
}
// 删除权限
export function deleteLimit(id) {
  return request({
    url: '/permissions/delete/' + Number(id) + '?token=' + getToken(),
    method: 'delete'
  })
}
// 新增权限
export function addNewLimit(form) {
  return request({
    url: '/permissions/add?token=' + getToken(),
    method: 'post',
    data: {
      permission_name: form.permission_name,
      permission_key: form.permission_key,
      route: form.route,
      menubar: form.menubar,
      actived: form.actived,
      permission_id: form.permission_id
    }
  })
}
