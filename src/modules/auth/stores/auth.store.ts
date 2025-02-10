import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/modules/auth/interfaces';
import { AuthStatusEnum } from '@/modules/auth/interfaces';
import { loginAction } from '@/modules/auth/actions';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatusEnum.Checking);
  const user = ref<User | undefined>();
  const token = ref('');

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);
      if (!loginResponse.ok) {
        return false;
      }
      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatusEnum.Authenticated;
      return true;
    } catch (e) {
      console.log(e);
      return logout();
    }
  };
  const logout = () => {
    authStatus.value = AuthStatusEnum.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };
  return {
    authStatus,
    user,
    token,
    //Getters
    isChecking: computed(() => authStatus.value === AuthStatusEnum.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatusEnum.Authenticated),
    username: computed(() => user.value?.fullName),

    // Actions
    login,
  };
});
