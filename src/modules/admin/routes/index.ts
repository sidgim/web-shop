import type { RouteRecordRaw } from 'vue-router';
import isAdminGuard from '@/modules/auth/guards/is-admin.guard.ts';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard.ts';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
};
