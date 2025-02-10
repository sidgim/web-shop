import type { User } from '@/modules/auth/interfaces/user.interface.ts';

export interface AuthResponse {
  token: string;
  user: User;
}
