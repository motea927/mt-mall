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
  ],
})
