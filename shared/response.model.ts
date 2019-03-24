import { employees, feedback, performance_reviews, users } from './models';
import { Omit } from './utils';

export type SafeUser = Omit<users, 'emp_id' | 'password'>;

export interface LoginResponse {
  login: boolean;
  user?: SafeUser;
  message?: string;
  token?: string;
}

export type ReviewResponse = performance_reviews & {
  feedbacks: feedback[]
}

export type FeedbackResponse = performance_reviews &
  Pick<feedback, 'assigned_date' | 'status' | 'response'> &
  employees;
