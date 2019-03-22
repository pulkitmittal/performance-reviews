import { Users } from '../models';
import { Omit } from '../utils';

export interface LoginResponse {
  login: boolean;
  user?: Omit<Users, 'password'>;
  message?: string;
  token?: string;
}