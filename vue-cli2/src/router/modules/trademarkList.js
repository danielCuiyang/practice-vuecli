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
      meta: { title: '商标列表'}
    },
    {
      path: 'trademarkdetails',
      component: () => import('@/views/trademarkList/details'),
      name: 'Details',
      meta: { title: '商标详情'}
    }
  ]
}

export default trademarkListRouter
