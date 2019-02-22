import Layout from '@/views/layout/index'
const SlotRouter = {
  path: '/',
  component: Layout,
  redirect:'slotName', 
  children:[
  {
      path: '/slotName',
      name: 'slotName',
      component: ()=>import('@/views/slotsDemo/slots')
  }
  ]
}
export default SlotRouter
