import type { RouteRecordRaw } from 'vue-router';
import isNotAuthenticatedGuard from '@/modules/auth/guards/is-not-authenticated.guard.ts';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  beforeEnter: [isNotAuthenticatedGuard],
  redirect: { name: 'login' },
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/modules/auth/views/RegisterView.vue'),
    },
  ],
};
