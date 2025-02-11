import { producApi } from '@/api/productsApi.ts';
import type {
  AuthApiResponse,
  AuthErrorResponse,
  AuthSuccessResponse,
} from '@/modules/auth/interfaces';
import { isAxiosError } from 'axios';

export const loginAction = async (
  email: string,
  password: string,
): Promise<AuthSuccessResponse | AuthErrorResponse> => {
  try {
    const { data } = await producApi.post<AuthApiResponse>('/auth/login', {
      email,
      password,
    });
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 401) {
      return {
        ok: false,
        message: 'Invalid credentials',
      };
    }
    throw new Error('Error login');
  }
};
