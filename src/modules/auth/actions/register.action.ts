import { producApi } from '@/api/productsApi.ts';
import type {
  AuthApiResponse,
  AuthErrorResponse,
  AuthSuccessResponse,
} from '@/modules/auth/interfaces';

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<AuthSuccessResponse | AuthErrorResponse> => {
  try {
    if (!fullName || !email || !password) return { ok: false, message: 'Invalid data' };

    const { data } = await producApi.post<AuthApiResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (e) {
    return { ok: false, message: `Error registering ${e}` };
  }
};
