import Layout from '@/views/layout/index'
const faithRouter = {
  path: '/',
  component: Layout,
  redirect: 'agreement',
  meta: { title: '诚信保证金协议'},
  children: [
    {
      path: 'agreement',
      component: () => import('@/views/faithDeposit/agreement'),
      name: 'agreement',
      //showSearch 控制是否显示头部搜索ICON
      //showEdit 控制是否显示编辑二字
      meta: { title: '诚信保证金协议'} 
    },
    {
      path: 'faithPartner',
      component: () => import('@/views/faithDeposit/faithPartner'),
      name: 'faithPartner',
      //showSearch 控制是否显示头部搜索ICON
      //showEdit 控制是否显示编辑二字
      meta: { title: '诚信保证金合作'} 
    },
  ]
}

export default faithRouter
