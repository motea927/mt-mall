import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  // mt mall
  {
    path: '/product',
    component: Layout,
    redirect: '/product/category/list',
    meta: { title: '商品管理', icon: 'el-icon-shopping-cart-full' },
    alwaysShow: true,
    children: [
      {
        path: '/product/category/list',
        name: 'ProductCategoryList',
        component: () => import('@/views/product/category/list'),
        meta: { title: '商品類別', icon: 'el-icon-notebook-2' }
      },
      {
        path: '/product/category/edit',
        name: 'ProductCategoryEdit',
        component: () => import('@/views/product/category/edit'),
        meta: { title: '類別編輯', icon: 'dashboard' },
        hidden: true
      },
      {
        path: '/product/category/add',
        name: 'ProductCategoryAdd',
        component: () => import('@/views/product/category/add'),
        meta: { title: '新增類別', icon: 'dashboard' },
        hidden: true
      },
      {
        path: '/product/item/list',
        name: 'ProductItemList',
        component: () => import('@/views/product/item/list'),
        meta: { title: '商品管理', icon: 'el-icon-present' }
      },
      {
        path: '/product/item/add',
        name: 'ProductItemAdd',
        component: () => import('@/views/product/item/addOrEdit'),
        meta: { title: '新增商品' },
        hidden: true
      },
      {
        path: '/product/item/edit',
        name: 'ProductItemEdit',
        component: () => import('@/views/product/item/addOrEdit'),
        meta: { title: '修改商品' },
        hidden: true
      }
    ]
  },
  {
    path: '/web-user',
    name: 'WebUser',
    component: Layout,
    redirect: '/web-user/list',
    meta: { title: '會員管理', icon: 'el-icon-s-custom' },
    children: [
      {
        path: '/web-user/list',
        name: 'WebUserList',
        component: () => import('@/views/web-user/list'),
        meta: { title: '會員列表', icon: 'el-icon-s-custom' }
      },
      {
        path: '/web-user/add',
        name: 'WebUserAdd',
        component: () => import('@/views/web-user/add'),
        meta: { title: '新增會員', icon: 'el-icon-notebook-2' },
        hidden: true
      },
      {
        path: '/web-user/edit',
        name: 'WebUserEdit',
        component: () => import('@/views/web-user/edit'),
        meta: { title: '編輯會員', icon: 'el-icon-notebook-2' },
        hidden: true
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    meta: { title: '訂單管理', icon: 'el-icon-s-order' },
    children: [
      {
        path: '/order/list',
        name: 'WebOrder',
        component: () => import('@/views/order/list'),
        meta: { title: '訂單列表', icon: 'el-icon-s-order' }
      }
    ]
  },

  {
    path: 'Github',
    component: Layout,
    children: [
      {
        path: 'https://github.com/motea927/mt-mall',
        meta: { title: 'Github', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
