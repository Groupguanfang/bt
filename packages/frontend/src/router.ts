import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '/',
      path: '/',
      component: () => import('./index.vue')
    },
    {
      name: '服务器管理页',
      path: '/servers',
      component: () => import('./views/Server.vue')
    },
    {
      name: 'ROOT',
      path: '/dashboard',
      component: () => import('./Root.vue'),
      children: [
        {
          name: '主页',
          path: '/dashboard',
          component: () => import('./views/Dashboard.vue')
        },
        {
          name: '工作',
          path: '/workspace',
          component: () => import('./views/Workspace/Editor.vue')
        },
        {
          name: '数据',
          path: '/data',
          component: () => import('./views/Data.vue')
        },
        {
          name: '任务',
          path: '/task',
          component: () => import('./views/Task.vue')
        },
        {
          name: '商店',
          path: '/store',
          component: () => import('./views/Store.vue')
        }
      ]
    }
  ]
})

export default router
