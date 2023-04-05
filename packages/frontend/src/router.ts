import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '服务器管理页',
      path: '/servers',
      component: () => import('./views/Server.vue')
    },
    {
      name: '服务器主页',
      path: '/dashboard',
      component: () => import('./views/Dashboard.vue')
    }
  ]
})

export default router
