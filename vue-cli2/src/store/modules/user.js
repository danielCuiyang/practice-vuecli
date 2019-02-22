import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import axios from 'axios'

const user = {
  state: {
    token: getToken(),
    name: '',
    phone: '',
    roles: [],
    superAdmin: 0,
    authority: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_SUPER_ADMIN: (state, superAdmin) => {
      state.superAdmin = superAdmin
    },
    SET_AUTHORITY: (state, authority) => {
      state.authority = authority
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const login_name = userInfo.login_name.trim()
      return new Promise((resolve, reject) => {
        login(login_name, userInfo.password).then(response => {
          const data = response.data
          setToken(data.access_token)
          commit('SET_TOKEN', data.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.route_list && data.route_list.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.route_list)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_SUPER_ADMIN', data.super_admin)
          commit('SET_AUTHORITY', data.authority)
          commit('SET_NAME', data.login_name)
          commit('SET_PHONE', data.phone)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then((response) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
