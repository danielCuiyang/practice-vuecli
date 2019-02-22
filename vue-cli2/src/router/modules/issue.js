import Layout from '@/views/layout/index'
const issueRouter = {
  path: '/',
  component: Layout,
  redirect: 'issue',
  meta: { title: '发布商标'},
  children: [
    {
      path: 'issue',
      component: () => import('@/views/issue/index'),
      name: 'Issue',
      meta: { title: '发布商标'}
    },
    {
      path: 'select',
      component: () => import('@/views/issue/select'),
      name: 'Select',
      meta: { title: '选择商标'}
    }
  ]
}

export default issueRouter
