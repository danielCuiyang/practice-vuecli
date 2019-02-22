import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import axios from 'axios'

// 获取角色列表
export function getRoleList(page, page_size) {
  return request({
    url: '/roles/index?token=' + getToken(),
    method: 'get',
    params: {
      page,
      page_size
    }
  })
}
// 新增角色
export function addNewRole(form) {
  return request({
    url: '/roles/add?token=' + getToken(),
    method: 'post',
    data: {
      role_name: form.role_name
    }
  })
}
// 删除角色
export function deleteRole(form) {
  var data = {
      role_name: form.role_name,
      actived: '0'
    }, url = process.env.BASE_API + '/roles/edit/' + Number(form.id) + '?token=' + getToken()
  return axios.put(url, data)
}
// 编辑角色
export function editRole(form) {
  var data = {
      role_name: form.role_name,
      actived: '1'
    }, url = process.env.BASE_API + '/roles/edit/' + Number(form.id) + '?token=' + getToken()
  return axios.put(url, data)
}

// 获取角色权限

export function getRoleLimit(role_id) {
  return request({
    url: '/role_permissions?token=' + getToken(),
    method: 'get',
    params: {
      role_id
    }
  })
}
// 添加角色权限
export function addRoleLimit(role_id, id) {
  return request({
    url: '/role_permissions/add?token=' + getToken(),
    method: 'post',
    data: {
      role_id,
      permission_id: id
    }
  })
}

// 公司列表
export function companiesList(query) {
  return request({
    url: '/companies?token=' + getToken(),
    method: 'get',
    params: {
      page: query.page,
      page_size: query.page_size,
      keyword: query.keyword
    }
  })
}

// 公司列表编辑
export function editUserList(form) {
  var data = {
      company_name: form.company_name,
      linkman: form.linkman,
      address: form.address,
      telephone: form.telephone
    }, url = process.env.BASE_API + '/companies/edit/' + Number(form.company_id) + '?token=' + getToken()
  return axios.put(url, data)
}

// 公司列表新增
export function addUserList(form) {
  return request({
    url: '/companies/add/add?token=' + getToken(),
    method: 'post',
    data: {
      company_name: form.company_name,
      linkman: form.linkman,
      telephone: form.telephone,
      address: form.address,
      files:form.files.join(',')
    }
  })
}

// 用户管理列表
export function usersList(query) {
  return request({
    url: '/users?token=' + getToken(),
    method: 'get',
    params: {
      company_id: query.company_id,
      page: query.page,
      page_size: query.page_size,
      keyword: query.keyword
    }
  })
}
// 编辑用户管理列表
export function editUsers(form) {
  var data = {
      login_name: form.login_name,
      password: form.password,
      user_name: form.user_name,
      remark: form.remark,
      roles: form.role_id,
      phone: form.phone
    }, url = process.env.BASE_API + '/users/edit/' + Number(form.id) + '?token=' + getToken()
  return axios.put(url, data)
}

// 新增用户管理列表
export function addUsers(form) {
  return request({
    url: '/users/add?token=' + getToken(),
    method: 'post',
    data: {
      login_name: form.login_name,
      password: form.password,
      user_name: form.user_name,
      company_id: form.company_id,
      remark: form.remark,
      roles: form.role_id,
      phone: form.phone
    }
  })
}

// 用户管理列表删除
export function deleteuser(id) {
  return request({
    url: '/users/delete/' + Number(id) + '?token=' + getToken(),
    method: 'delete'
  })
}

// 删除角色权限列表
export function deleteRoleLimit(role_id, id) {
  var data = {
      role_id: role_id,
      permission_id: id
    }, url = process.env.BASE_API + '/role_permissions/delete/' + Number(id) + '?token=' + getToken()
  return axios.delete(url, { data })
}


// 删除附件
export function deletefile(file_name) {
  var data = {
    file_name,
  }, url = process.env.BASE_API + '/attachments/delete/?token=' + getToken()
  return axios.delete(url, { data })
}

//查看附件
export function seeadjunct(id) {
  return request({
    url: '/attachments/attach?token='+getToken(),
    method: 'get',
    params: {
      source_id: id,
      source_type:1
    }
  })
}

//上传附件
export function uploadingAdjunct(data) {
  return request({
    url: '/attachments/upload?token=' + getToken(),
    method: 'post',
    data: data
  })
}

