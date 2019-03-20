import Layout from '@/views/layout/index'
const trademarkListRouter = {
  path: '/',
  component: Layout,
  redirect: 'issue',
  meta: { title: '发布商标'},
  children: [
    {
      path: 'trademarkList',
      component: () => import('@/views/trademarkList/index'),
      name: 'TrademarkList',
      meta: { title: '商标列表',showSearch:true,showBorder:true }
    },
    {
      path: 'trademarkdetails',
      component: () => import('@/views/trademarkList/details'),
      name: 'Details',
      meta: { title: '商标详情'}
    },
    {
      path: 'trademarkSbState',
      component: () => import('@/views/trademarkList/sbState'),
      name: 'SbState',
      meta: { title: '商标状态'}
    },
    {
      path: 'trademarkSbServerList',
      component: () => import('@/views/trademarkList/sbServerList'),
      name: 'SbServerList',
      meta: { title: '商标服务列表'}
    },
    {
      path: 'trademarkSoldout',
      component: () => import('@/views/trademarkList/soldout'),
      name: 'Soldout',
      meta: { title: '已下架',showSearch:true}
    },
    {
      path: 'trademarkToaudit',
      component: () => import('@/views/trademarkList/toaudit'),
      name: 'Toaudit',
      meta: { title: '待审核',showSearch:true}
    }
  ]
}

export default trademarkListRouter
