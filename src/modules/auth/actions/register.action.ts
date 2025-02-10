import { producApi } from '@/api/productsApi.ts';
import type { AuthResponse, User } from '@/modules/auth/interfaces';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  token: string;
  user: User;
}
export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterSuccess | RegisterError> => {
  try {
    if (!fullName || !email || !password) return { ok: false, message: 'Invalid data' };

    const { data } = await producApi.post<AuthResponse>('/auth/register', {
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
