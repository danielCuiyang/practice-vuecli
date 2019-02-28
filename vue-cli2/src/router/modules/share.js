import Layout from '@/views/layout/index'
const shareRouter = {
  path: '/',
  component: Layout,
  redirect: 'shareDetail',
  meta: { title: '商标详情'},
  children: [
    {
      path: 'shareDetail',
      component: () => import('@/views/share/shareDetail'),
      name: 'ShareDetail',
      meta: { title: '商标详情'}
    }
  ]
}

export default shareRouter
