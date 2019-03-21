import { Omit } from '../utils';
import { User } from './user.model';

export interface LoginResponse {
  login: boolean;
  user?: Omit<User, 'password'>;
  message?: string;
  token?: string;
}