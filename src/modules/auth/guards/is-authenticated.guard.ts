import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/modules/auth/stores/auth.store.ts';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.checkAuthStatus();

  if (!isAuthenticated) return next({ name: 'login' });
  return next();
};

export default isAuthenticatedGuard;
