import { Request, Response } from 'express';

import { Employee, PerformanceReview } from '..';
import Errors from '../../shared/errors';
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
    return queries.getReview(id).then(reviews => {
      response.status(200).json(reviews);
    });
  }
};

const getReviews = (request: Request, response: Response) => {
  return queries.getReviews().then(reviews => {
    response.status(200).json(reviews);
  });
};

const addReview = (request: Request, response: Response) => {
  const { empId, dueDate }: PerformanceReview = (request.body || {});
  let { reviewerIds }: { reviewerIds: number[] } = (request.body || {});

  if (!empId || !dueDate) {
    const field: string = !empId && 'empId' || !dueDate && 'dueDate';
    const { code, message } = Errors.missing(field);
    response.status(code).send(message);

  } else {
    return queries.addReview({ empId, dueDate })
      .then(id => {
        return new Promise<[number, number, number]>((resolve, reject) => {
          try {
            if (reviewerIds && typeof reviewerIds === 'object' && reviewerIds.length) {
              reviewerIds = reviewerIds.map(rId => +rId).filter(rId => !isNaN(rId) && rId !== empId);
              console.log('reviewerIds:', reviewerIds, typeof reviewerIds, reviewerIds.length);
              if (reviewerIds.length) {
                queries.addFeedbacks(id, reviewerIds)
                  .then(([added, deleted]) => resolve([id, added, deleted]));
                return;
              }
            }
            resolve([id, 0, 0]);
          } catch (e) {
            reject(e);
          }
        });
      })
      .then(([id, added, deleted]) => {
        response.status(201).send(
          `Review added with ID: ${id}; ${added} feedbacks added; ${deleted} feedbacks deleted`
        );
      });
  }
};

// const updateReview = (request: Request, response: Response) => {
//   const id = +request.params.id;
//   const { empId, reviewerId, status, dueDate }: PerformanceReview = (request.body || {});
//   if (!empId || !reviewerId || !status || !dueDate) {
//     const field: string = !empId && 'empId' ||
//       !reviewerId && 'reviewerId' ||
//       !status && 'status' ||
//       !dueDate && 'dueDate';
//     const { code, message } = Errors.missing(field);
//     response.status(code).send(message);
//   } else {
//     queries.addReview({ empId, reviewerId, status, dueDate })
//       .then(id => {
//         response.status(201).send(`Review added with ID: ${id}`);
//       });
//   }
// };

export default {
  getEmployee,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getReview,
  getReviews,
  addReview,
  // updateReview
};
