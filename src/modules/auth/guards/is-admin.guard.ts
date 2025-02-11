import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/modules/auth/stores/auth.store.ts';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const useAuth = useAuthStore();

  if (useAuth.isAdmin) {
    return next();
  }
  return next({
    name: 'home',
  });
};

export default isAdminGuard;
