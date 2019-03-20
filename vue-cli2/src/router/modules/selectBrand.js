import Layout from '@/views/layout/index'
const selectBrandRouter = {
  path: '/',
  component: Layout,
  redirect: 'selectBrand',
  meta: { title: '选择商标注册人'},
  children: [
    {
      path: 'selectBrand/:registrant_hash',
      component: () => import('@/views/selectBrand/index'),
      name: 'selectBrand',
      meta: { title: '选择商标',showSearch:true,showEdit:true} 
    },
  ]
}

export default selectBrandRouter
