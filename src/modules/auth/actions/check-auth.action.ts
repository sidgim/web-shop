import { producApi } from '@/api/productsApi.ts';
import type {
  AuthApiResponse,
  AuthErrorResponse,
  AuthSuccessResponse,
} from '@/modules/auth/interfaces';
import { isAxiosError } from 'axios';

export const checkAuthAction = async (): Promise<AuthSuccessResponse | AuthErrorResponse> => {
  try {
    const localToken = localStorage.getItem('token');
    if (!localToken) return { ok: false, message: 'No token found' };

    const { data } = await producApi.get<AuthApiResponse>('/auth/check-status');
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 401) {
      return { ok: false, message: 'Axios error' };
    }
    return { ok: false, message: 'Error checking auth' };
  }
};
