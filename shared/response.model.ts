import { Feedback, PerformanceReviews, Users } from './models';
import { Omit } from './utils';

export type SafeUser = Omit<Users, 'empId' | 'password'>;

export interface LoginResponse {
  login: boolean;
  user?: SafeUser;
  message?: string;
  token?: string;
}

export type ReviewResponse = PerformanceReviews & {
  feedbacks: Feedback[]
}
