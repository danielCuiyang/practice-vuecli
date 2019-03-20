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
      meta: { title: '诚信保证金协议'} 
    },
    {
      path: 'faithPartner',
      component: () => import('@/views/faithDeposit/faithPartner'),
      name: 'faithPartner',
      meta: { title: '诚信保证金合作'} 
    },
  ]
}

export default faithRouter
