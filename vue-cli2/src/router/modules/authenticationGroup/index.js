import Layout from '@/views/layout/index'
const authTypeRouter = {
  path: '/',
  component: Layout,
  redirect: 'authType',
  meta: { title: '选择认证类型'},
  children: [
    {
      path: 'authType',
      component: () => import('@/views/authenticationGroup/authType'),
      name: 'authType',
      //showSearch 控制是否显示头部搜索ICON
      //showEdit 控制是否显示编辑二字
      meta: { title: '选择认证类型',showSearch:false,showEdit:false} 
    },
    {
      path: 'authCompany',
      component: () => import('@/views/authenticationGroup/authCompany'),
      name: 'authCompany',
      //showSearch 控制是否显示头部搜索ICON
      //showEdit 控制是否显示编辑二字
      meta: { title: '企业认证',showSearch:false,showEdit:false} 
    },
    {
      path: 'authPersonal',
      component: () => import('@/views/authenticationGroup/authPersonal'),
      name: 'authPersonal',
      //showSearch 控制是否显示头部搜索ICON
      //showEdit 控制是否显示编辑二字
      meta: { title: '个人认证',showSearch:false,showEdit:false} 
    },
    {
      path: 'authSuccess',
      component: () => import('@/views/authenticationGroup/authSuccess'),
      name: 'authSuccess',
      //showSearch 控制是否显示头部搜索ICON
      //showEdit 控制是否显示编辑二字
      meta: { title: '提交认证',showSearch:false,showEdit:false} 
    }
  ]
}

export default authTypeRouter
