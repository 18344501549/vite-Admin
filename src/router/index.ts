import { createRouter, createWebHistory } from 'vue-router'
import AppAdmin from '@/layouts/AppAdmin.vue';
import RoleIndex from '@/views/role/RoleIndex.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'loginIndex',
      component: () => import('@/views/login/LoginIndex.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: AppAdmin,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'roleList',
          component: RoleIndex
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import('@/views/menu/MenuIndex.vue')
        },
        {
          path: '/menu/create',
          name: 'menu-create',
          component: () => import('@/views/menu/CreateOrEdit.vue')
        },
        {
          path: '/:xxx(.*)*',
          name: 'errorPage',
          component: () => import('@/views/errorpage/ErrorPage.vue')
        }
      ]
    },
  ]
});




export default router;
