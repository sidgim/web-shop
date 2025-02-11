import type { User } from '@/modules/auth/interfaces/user.interface.ts';

export interface AuthSuccessResponse {
  ok: true;
  token: string;
  user: User;
}
