import { Request, Response } from 'express';

import { Employee, Feedback, PerformanceReview, ReviewResponse } from '..';
import Errors from '../../shared/errors';
import auth from './auth';
import queries from './queries';

const getEmployee = (request: Request, response: Response) => {
  const id = +request.params.id;
  if (!id) {
    const { code, message } = Errors.missing('id');
    response.status(code).send(message);
  } else {
    return queries.getEmployee(id).then(employee => {
      response.status(200).json(employee);
    });
  }
};

const getEmployees = (request: Request, response: Response) => {
  return queries.getEmployees().then(employees => {
    response.status(200).json(employees);
  });
};

const addEmployee = (request: Request, response: Response) => {
  const { name, post, department, location }: Employee = (request.body || {});
  if (!name) {
    const { code, message } = Errors.missing('name');
    response.status(code).send(message);
  } else {
    return queries.addEmployee({ name, post, department, location })
      .then(id => {
        response.status(201).send(`Employee added with ID: ${id}`);
      });
  }
};

const updateEmployee = (request: Request, response: Response) => {
  const id = +request.params.id;
  const { name, post, department, location }: Employee = (request.body || {});
  if (!id || !name) {
    const { code, message } = Errors.missing(!id ? 'id' : 'name');
    response.status(code).send(message);
  } else {
    return queries.updateEmployee({ id, name, post, department, location })
      .then(rows => {
        if (rows === 1) {
          response.status(200).send(`Employee updated with ID: ${id}`);
        } else {
          response.status(200).send(`Employee with ID: ${id} cannot be updated`);
        }
      });
  }
};

const deleteEmployee = (request: Request, response: Response) => {
  const id = +request.params.id;
  if (!id) {
    const { code, message } = Errors.missing('id');
    response.status(code).send(message);
  } else {
    return queries.deleteEmployee(id)
      .then(rows => {
        if (rows === 1) {
          response.status(200).send(`Employee deleted with ID: ${id}`);
        } else {
          response.status(200).send(`Employee with ID: ${id} cannot be deleted`);
        }
      });
  }
};

const getReview = (request: Request, response: Response) => {
  const id = +request.params.id;
  if (!id) {
    const { code, message } = Errors.missing('id');
    response.status(code).send(message);
  } else {
    return Promise.all([
      queries.getReview(id),
      queries.getFeedback(id)
    ]).then(([review, feedbacks]) => {
      const resp: ReviewResponse = {
        ...review,
        feedbacks
      };
      response.status(200).json(resp);
    });
  }
};

const getReviews = (request: Request, response: Response) => {
  return Promise.all([
    queries.getReviews(),
    queries.getAllFeedbacks()
  ]).then(([reviews, feedbacks]) => {
    const resp: ReviewResponse[] = reviews.map(review => ({
      ...review,
      feedbacks: feedbacks.filter(f => f.id === review.id)
    }));
    response.status(200).json(resp);
  });
};

const addReview = (request: Request, response: Response) => {
  const { empId, dueDate }: PerformanceReview = (request.body || {});
  const { reviewerIds }: { reviewerIds: number[] } = (request.body || {});

  if (!empId || !dueDate) {
    const field: string = !empId && 'empId' || !dueDate && 'dueDate';
    const { code, message } = Errors.missing(field);
    response.status(code).send(message);

  } else {
    return queries.addReview({ empId, dueDate })
      .then(id => setReviewers(id, empId, reviewerIds))
      .then(([id, added, deleted]) => {
        response.status(201).send(
          `Review added with ID: ${id}; ${added} feedbacks added; ${deleted} feedbacks deleted`
        );
      });
  }
};

const setReviewers = (prId: number, empId: number, reviewerIds: number[]) => {
  console.log('setReviewers:', prId, empId, reviewerIds);
  return new Promise<[number, number, number]>((resolve, reject) => {
    try {
      if (reviewerIds && typeof reviewerIds === 'object' && reviewerIds.length) {
        reviewerIds = reviewerIds.map(rId => +rId).filter(rId => !isNaN(rId) && rId !== empId);
        console.log('reviewerIds:', reviewerIds, typeof reviewerIds, reviewerIds.length);
        if (reviewerIds.length) {
          queries.setReviewers(prId, reviewerIds)
            .then(([added, deleted]) => resolve([prId, added, deleted]));
          return;
        }
      }
      resolve([prId, 0, 0]);
    } catch (e) {
      reject(e);
    }
  });
};

const updateReview = (request: Request, response: Response) => {
  const id = +request.params.id;
  const { empId, dueDate }: PerformanceReview = (request.body || {});
  const { reviewerIds }: { reviewerIds: number[] } = (request.body || {});

  if (!id || !empId || !dueDate) {
    const field: string = !id && 'id' || !empId && 'empId' || !dueDate && 'dueDate';
    const { code, message } = Errors.missing(field);
    response.status(code).send(message);
  } else {
    return queries.updateReview({ id, dueDate })
      .then((count) => {
        if (count === 1) {
          return setReviewers(id, empId, reviewerIds);
        } else {
          throw Error(`Cannot update review with ID: ${id}`);
        }
      })
      .then(([_, added, deleted]) => {
        response.status(200).send(
          `Review updated with ID: ${id}; ${added} feedbacks added; ${deleted} feedbacks deleted`
        );
      });
  }
};

const deleteReview = (request: Request, response: Response) => {
  const id = +request.params.id;
  if (!id) {
    const { code, message } = Errors.missing('id');
    response.status(code).send(message);
  } else {
    return queries.deleteReview(id)
      .then(rows => {
        if (rows === 1) {
          response.status(200).send(`Review deleted with ID: ${id}`);
        } else {
          response.status(200).send(`Review with ID: ${id} cannot be deleted`);
        }
      });
  }
};

const getFeedbacks = (request: Request, response: Response) => {
  const user = auth.getAuthUser(request);
  if (user.empId) {
    return queries.getFeedbacks(user.empId).then(feedbacks => {
      response.status(200).json(feedbacks);
    });
  } else {
    const { code, message } = Errors.notForAdmin();
    response.status(code).send(message);
  }
};

const updateFeedback = (req: Request, res: Response) => {
  const user = auth.getAuthUser(req);
  const id = +req.params.id;
  const { status, response }: Feedback = (req.body || {});

  if (!id || !status || !response) {
    const field: string = !id && 'id' || !status && 'status' || !response && 'response';
    const { code, message } = Errors.missing(field);
    res.status(code).send(message);

  } else if (!user.empId) {
    const { code, message } = Errors.notForAdmin();
    res.status(code).send(message);

  } else {
    return queries.updateFeedback({ id, reviewerId: user.empId, status, response })
      .then(count => {
        res.status(200).send(
          count === 1 ?
            `Feedback updated with ID: ${id}` :
            `Feedback not updated for ID: ${id}`
        );
      });

  }
};

export default {
  getEmployee,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getReview,
  getReviews,
  addReview,
  updateReview,
  deleteReview,
  getFeedbacks,
  updateFeedback
};
