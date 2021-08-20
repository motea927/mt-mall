import { createRouter, createWebHistory } from 'vue-router'
import Index from '/@/pages/Index.vue'

import { store } from '/@/store/store'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index,
    },
    {
      name: 'Product',
      path: '/product',
      component: () => import('/@/pages/Product.vue'),
    },
    {
      name: 'ProductDetailRedirect',
      path: '/product-detail',
      redirect: '/product',
      component: () => import('/@/pages/ProductDetail.vue'),
    },
    {
      name: 'ProductDetail',
      path: '/product-detail/:id',
      component: () => import('/@/pages/ProductDetail.vue'),
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('/@/pages/Login.vue'),
    },
    {
      name: 'Signup',
      path: '/signup',
      component: () => import('/@/pages/Signup.vue'),
    },
    {
      name: 'Cart',
      path: '/cart',
      component: () => import('/@/pages/Cart.vue'),
    },
    {
      name: 'Purchase',
      path: '/purchase',
      component: () => import('/@/pages/Purchase.vue'),
      redirect: '/purchase/address',
      children: [
        {
          name: 'PurchaseAddress',
          path: 'address',
          component: () => import('/@/pages/Purchase/Address.vue'),
        },
        {
          name: 'PurchaseCredit',
          path: 'credit',
          component: () => import('/@/pages/Purchase/Credit.vue'),
        },
      ],
    },
    {
      name: 'OrderDetail',
      path: '/order-detail',
      component: () => import('/@/pages/OrderDetail.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const privatePagesPath = [
    '/purchase',
    '/purchase/address',
    '/purchase/credit',
    '/order-detail',
  ]
  const authRequired = privatePagesPath.includes(to.path)

  const loggedIn = store.state.user.token

  if (authRequired && !loggedIn) {
    return next('/')
  }

  next()
})
