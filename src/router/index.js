import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/admin/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/management', component: () => import('@/views/management/index'), hidden: true },
  // { path: '/buy', component: () => import('@/views/buy/index'), hidden: true },
  // { path: '/checkout/:code', component: () => import('@/views/buy/checkout'), hidden: true },
  // { path: '/payment', component: () => import('@/views/payment/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // { path: '/pricing', component: () => import('@/views/pricing/index'), hidden: true },
  { path: '/', component: () => import('@/views/home/notFound'), hidden: true },
  { path: '/:id', component: () => import('@/views/home/index'), hidden: true },
  // { path: '/register', component: () => import('@/views/home/register'), hidden: true },
  // { path: '/register/installer', component: () => import('@/views/home/installer'), hidden: true },
  // { path: '/register/retailer', component: () => import('@/views/home/retailer'), hidden: true },
  // { path: '/register/company', component: () => import('@/views/home/company'), hidden: true },
  { path: '/legal', component: () => import('@/views/legal/legal'), hidden: true },
  { path: '/privacy', component: () => import('@/views/legal/privacy'), hidden: true },
  { path: '/cookie', component: () => import('@/views/legal/cookie'), hidden: true }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  mode: 'history'
})

export const unconfirmedRouterMap = [
  { path: '/dashboard', component: () => import('@/views/unconfirmed/index'), hidden: true }
]

export const approvedRouterMap = [
  { path: '/dashboard', component: () => import('@/views/unconfirmed/index'), hidden: true }
]

export const rejectedRouterMap = [
  { path: '/dashboard', component: () => import('@/views/unconfirmed/rejected'), hidden: true }
]

export const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    meta: { title: 'Dashboard' },
    children: [{
      path: '',
      component: () => import('@/views/admin/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'el-icon-monitor' }
    },
    {
      path: 'instance',
      component: () => import('@/views/admin/dashboard/index'),
      name: 'New Instance',
      meta: { title: 'New Instance' },
      hidden: true
    }]
  },
  {
    path: '/registration',
    component: Layout,
    redirect: 'registration',
    name: 'Registration',
    meta: { title: 'Registration', icon: 'el-icon-takeaway-box' },
    children: [{
      path: '',
      component: () => import('@/views/admin/customers/index'),
      meta: { title: 'Customer', icon: 'el-icon-takeaway-box' }
    },
    {
      path: 'product',
      component: () => import('@/views/admin/product/index'),
      meta: { title: 'Products', icon: 'el-icon-takeaway-box' }
    },
    {
      path: 'customercode',
      component: () => import('@/views/admin/customercode/index'),
      meta: { title: 'Customer Code', icon: 'el-icon-takeaway-box' }
    },
    {
      path: 'agent',
      component: () => import('@/views/admin/agent/index'),
      meta: { title: 'Agent', icon: 'el-icon-takeaway-box' }
    }
    // {
    //   path: 'user',
    //   component: () => import('@/views/admin/users/index'),
    //   meta: { title: 'User/Admin', icon: 'el-icon-takeaway-box' }
    // }
    ]
  },
  {
    path: '/quotation',
    component: Layout,
    redirect: 'quotation',
    name: 'Quotation',
    meta: { title: 'Pricing/Quotation' },
    children: [{
      path: '',
      component: () => import('@/views/admin/quotations/index'),
      meta: { title: 'Pricing/Quotation', icon: 'el-icon-takeaway-box' }
    }]
  },
  {
    path: '/sales',
    component: Layout,
    redirect: 'sales',
    name: 'Sales',
    meta: { title: 'Sales', icon: 'el-icon-takeaway-box' },
    children: [{
      path: '',
      name: 'sales',
      component: () => import('@/views/admin/orders/index'),
      meta: { title: 'Sales Order', icon: 'el-icon-takeaway-box' }
    },
    {
      path: 'cashsale',
      name: 'cashsales',
      component: () => import('@/views/admin/sales/index'),
      meta: { title: 'Cash Sale', icon: 'el-icon-takeaway-box' }
    },
    {
      path: 'delivery',
      name: 'delivery',
      component: () => import('@/views/admin/delivery/index'),
      meta: { title: 'DO', icon: 'el-icon-takeaway-box' }
    },
    {
      path: 'workorder',
      name: 'workorder',
      component: () => import('@/views/admin/workorder/index'),
      meta: { title: 'Work Order', icon: 'el-icon-takeaway-box' }
    },
    {
      path: 'invoice',
      name: 'invoice',
      component: () => import('@/views/admin/invoices/index'),
      meta: { title: 'Invoice', icon: 'el-icon-takeaway-box' }
    }]
  },
  {
    path: '/production',
    component: Layout,
    redirect: 'production',
    name: 'Production',
    meta: { title: 'Production', icon: 'el-icon-takeaway-box' },
    children: [{
      path: '',
      component: () => import('@/views/admin/product/index2'),
      meta: { title: 'Production', icon: 'el-icon-takeaway-box' }
    }]
  },
  {
    path: '/packing',
    component: Layout,
    redirect: 'packing',
    name: 'Packing/Deliver',
    meta: { title: 'Packing/Deliver', icon: 'el-icon-takeaway-box' },
    children: [{
      path: '',
      component: () => import('@/views/admin/packaging/index'),
      meta: { title: 'Packing List', icon: 'el-icon-takeaway-box' }
    },
    // {
    //   path: 'warehouse',
    //   component: () => import('@/views/admin/warehouse/index'),
    //   meta: { title: 'Warehouse', icon: 'el-icon-takeaway-box' }
    // },
    {
      path: 'delivery',
      component: () => import('@/views/admin/delivery/index2'),
      meta: { title: 'Delivery Agent', icon: 'el-icon-takeaway-box' }
    }]
  },
  {
    path: '/inventory',
    component: Layout,
    redirect: 'packing',
    name: 'Inventory',
    meta: { title: 'Inventory', icon: 'el-icon-takeaway-box' },
    children: [{
      path: '',
      component: () => import('@/views/admin/inventory/index'),
      meta: { title: 'Raw Mat', icon: 'el-icon-takeaway-box' }
    },
    {
      path: 'finish',
      component: () => import('@/views/admin/inventory/index2'),
      meta: { title: 'Finished Product', icon: 'el-icon-takeaway-box' }
    }]
  },
  {
    path: '/reporting',
    component: Layout,
    redirect: 'reporting',
    name: 'Reporting',
    meta: { title: 'Reporting' },
    children: [{
      path: '',
      component: () => import('@/views/admin/reporting/index'),
      meta: { title: 'Reporting', icon: 'el-icon-takeaway-box' }
    }]
  },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: 'profile',
  //   name: 'Profile',
  //   meta: { title: 'Profile' },
  //   children: [{
  //     path: '',
  //     component: () => import('@/views/admin/profile/index'),
  //     meta: { title: 'Profile', icon: 'el-icon-takeaway-box' }
  //   }]
  // },
  // {
  //   path: '/log',
  //   component: Layout,
  //   redirect: 'log',
  //   name: 'Log',
  //   meta: { title: 'Log' },
  //   children: [{
  //     path: '',
  //     component: () => import('@/views/admin/logs/index'),
  //     meta: { title: 'Log', icon: 'el-icon-takeaway-box' }
  //   }]
  // },
  // {
  //   path: '/settings',
  //   component: Layout,
  //   redirect: 'settings',
  //   name: 'Settings',
  //   meta: { title: 'Settings' },
  //   children: [{
  //     path: '',
  //     component: () => import('@/views/admin/settings/index'),
  //     meta: { title: 'Settings', icon: 'el-icon-takeaway-box' }
  //   }]
  // },
  // {
  //   path: '/notification',
  //   component: Layout,
  //   redirect: 'notification',
  //   name: 'Notification',
  //   meta: { title: 'Notification' },
  //   children: [{
  //     path: '',
  //     component: () => import('@/views/admin/notifications/index'),
  //     meta: { title: 'Notification', icon: 'el-icon-takeaway-box' }
  //   }]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]

export const scannerRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    meta: { title: 'Dashboard' },
    children: [{
      path: '',
      component: () => import('@/views/admin/dashboard/scanner'),
      meta: { title: 'Dashboard', icon: 'el-icon-monitor' }
    },
    {
      path: 'instance',
      component: () => import('@/views/admin/dashboard/scanner'),
      name: 'New Instance',
      meta: { title: 'New Instance' },
      hidden: true
    }]
  },
  {
    path: '/packing',
    component: Layout,
    redirect: 'packing',
    name: 'Packing/Deliver',
    meta: { title: 'Packing/Deliver', icon: 'el-icon-takeaway-box' },
    children: [
    {
      path: 'delivery',
      component: () => import('@/views/admin/delivery/index2'),
      meta: { title: 'Delivery Agent', icon: 'el-icon-takeaway-box' }
    }]
  }
]
