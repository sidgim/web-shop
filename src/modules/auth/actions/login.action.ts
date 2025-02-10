import { producApi } from '@/api/productsApi.ts';
import type { AuthResponse, User } from '@/modules/auth/interfaces';
import { isAxiosError } from 'axios';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  user: User;
  token: string;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await producApi.post<AuthResponse>('/auth/login', {
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
