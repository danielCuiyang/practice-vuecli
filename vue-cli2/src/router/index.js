import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import SlotRouter from './modules/slotDemo'
import trademarkRegistantRouter from './modules/trademarkRegistant'
import trademarkListRouter from './modules/trademarkList'
import selectBrandRouter from './modules/selectBrand'
import authTypeRouter from './modules/authenticationGroup'

export const routerArray = [
  {
    path:'/',
    component:()=>import('@/views/Home/index')
  },
  SlotRouter,
  authTypeRouter,
  trademarkRegistantRouter,
  selectBrandRouter,
  trademarkListRouter,
]
export default new Router({
  routes:routerArray
})
