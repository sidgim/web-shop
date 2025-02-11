import type { User } from '@/modules/auth/interfaces/user.interface.ts';

export interface AuthApiResponse {
  token: string;
  user: User;
}
