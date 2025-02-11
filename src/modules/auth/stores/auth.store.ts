import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/modules/auth/interfaces';
import { AuthStatusEnum } from '@/modules/auth/interfaces';
import { loginAction } from '@/modules/auth/actions';
import { useLocalStorage } from '@vueuse/core';
import { registerAction } from '@/modules/auth/actions/register.action.ts';
import { checkAuthAction } from '@/modules/auth/actions/check-auth.action.ts';

interface ResponseMessage {
  ok: boolean;
  message: string;
}
export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatusEnum.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string): Promise<ResponseMessage> => {
    try {
      const loginResponse = await loginAction(email, password);
      if (!loginResponse.ok) {
        logout();
        return { ok: false, message: 'Invalid credentials' };
      }
      updateStorage(loginResponse.user, loginResponse.token);
      return { ok: true, message: 'login successfully' };
    } catch (e) {
      logout();
      console.log(e);
      return { ok: false, message: `Error services login` };
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
  ): Promise<ResponseMessage> => {
    try {
      const registerResponse = await registerAction(fullName, email, password);
      if (registerResponse.ok === false) {
        logout();
        return { ok: false, message: registerResponse.message };
      }
      updateStorage(registerResponse.user, registerResponse.token);

      return { ok: true, message: 'Registered successfully' };
    } catch (e) {
      console.log(e);
      return { ok: false, message: 'Error registering' };
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusRes = await checkAuthAction();
      if (!statusRes.ok) {
        logout();
        return false;
      }
      updateStorage(statusRes.user, statusRes.token);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const updateStorage = (userRes: User, tokenRes: string): void => {
    user.value = userRes;
    token.value = tokenRes;
    authStatus.value = AuthStatusEnum.Authenticated;
  };

  const logout = (): void => {
    authStatus.value = AuthStatusEnum.Unauthenticated;
    user.value = undefined;
    token.value = '';
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
    register,
    checkAuthStatus,
  };
});
