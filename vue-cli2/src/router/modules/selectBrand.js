import Layout from '@/views/layout/index'
const selectBrandRouter = {
  path: '/',
  component: Layout,
  redirect: 'selectBrand',
  meta: { title: '选择商标注册人'},
  children: [
    {
      path: 'selectBrand',
      component: () => import('@/views/selectBrand/index'),
      name: 'selectBrand',
      //showSearch 控制是否显示头部搜索ICON
      //showEdit 控制是否显示编辑二字
      meta: { title: '选择商标',showSearch:true,showEdit:true} 
    },
  ]
}

export default selectBrandRouter
