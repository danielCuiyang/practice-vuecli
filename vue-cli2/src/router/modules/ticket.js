import Layout from '@/views/layout/index'
const ticketRouter = {
  path: '/',
  component: Layout,
  redirect: 'ticket',
  meta: { title: '发布商标'},
  children: [
    {
      path: 'ticket',
      component: () => import('@/views/ticket/index'),
      name: 'Ticket',
      meta: { title: '发票信息'}
    },
  ]
}

export default ticketRouter
