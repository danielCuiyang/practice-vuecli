import Layout from '@/views/layout/index'
const trademarkRegistantRouter = {
  path: '/',
  component: Layout,
  redirect: 'trademarkRegistant',
  meta: { title: '选择商标注册人'},
  children: [
    {
      path: 'trademarkRegistant',
      component: () => import('@/views/trademarkRegistant/index'),
      name: 'trademarkRegistant',
      //showSearch 控制是否显示头部搜索ICON
      meta: { title: '选择商标注册人',showSearch:true} 
    },
  ]
}

export default trademarkRegistantRouter
