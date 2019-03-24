import { PerformanceReview } from 'index';

import { feedbackFields } from './models';

export interface LoginRequest {
  username: string;
  password: string;
}

export type AddReviewRequest = Pick<PerformanceReview, 'emp_id' | 'due_date'> &
{
  reviewer_ids: feedbackFields.reviewer_id[]
}