import { createRouter, createWebHistory } from 'vue-router'
import Index from '/@/pages/Index.vue'

export default createRouter({
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
  ],
})
