import * as pg from 'pg';

import { Employee, Feedback, PerformanceReview, User } from '..';
import { Omit } from '../../shared/utils';

interface Results<T> { rows: Array<T>; }

// TODO move this to config.json
const pool = new pg.Pool({
  connectionString: 'postgres://qwjszpap:m_VyqLU2pyKDHbj9sbfG502Vn8BH8tMQ@isilo.db.elephantsql.com:5432/qwjszpap'
});

const checkUserCredentials = (username: string, password: string): Promise<User> => {
  return pool.query(`SELECT * FROM users
    WHERE
      username = $1 AND password = $2`,
    [username, password])
    .then((results: Results<User>) => {
      return results.rows[0];
    });
};

const getEmployees = (): Promise<Employee[]> => {
  return pool.query('SELECT * FROM employees')
    .then((results: Results<Employee>) => {
      return results.rows;
    });
};

const getEmployee = (id: number): Promise<Employee> => {
  return pool.query('SELECT * FROM employees WHERE id = $1', [id])
    .then((results: Results<Employee>) => {
      return results.rows[0];
    });
};

const addEmployee = (emp: Omit<Employee, 'id'>): Promise<number> => {
  const { name, post, department, location } = emp;
  const query = {
    text: `INSERT INTO employees(name, post, department, location)
    VALUES
      ($1, $2, $3, $4)
    RETURNING id`,
    values: [name, post, department, location]
  };

  return pool.query(query)
    .then((results: Results<Employee>) => {
      return results.rows[0].id;
    })
    .then(empId => {
      // add user for the newly created employee
      // TODO use proper username, generate a unique password, email a link to login and reset password
      const newUser: User = {
        id: null,
        empId,
        username: name.toLowerCase().replace(/\s/g, '-'),
        password: 'passw0rd',
        role: 'employee'
      };
      const userQuery = {
        text: `INSERT INTO users(emp_id, username, password, role)
          VALUES ($1, $2, $3, $4)`,
        values: [newUser.empId, newUser.username, newUser.password, newUser.role]
      };

      return pool.query(userQuery).then(() => {
        return empId;
      });
    });
};

const updateEmployee = (emp: Employee): Promise<number> => {
  const { id, name, post, department, location } = emp;
  const query = {
    text: `UPDATE employees
      SET
        name = $1,
        post = $2,
        department = $3,
        location = $4
      WHERE
        id = $5
      `,
    values: [name, post, department, location, id]
  };

  return pool.query(query).then((result) => {
    return result.rowCount;
  });
};

const deleteEmployee = (id: number): Promise<number> => {
  return pool.query('DELETE FROM employees WHERE id = $1', [id])
    .then((result) => {
      return result.rowCount;
    });
};

const getReviews = (): Promise<PerformanceReview[]> => {
  return pool.query('SELECT * FROM performance_reviews')
    .then((results: Results<PerformanceReview>) => {
      return results.rows;
    });
};

const getReview = (id: number): Promise<PerformanceReview> => {
  return pool.query(`SELECT * FROM performance_reviews
    WHERE
    id = $1`, [id])
    .then((results: Results<PerformanceReview>) => {
      return results.rows[0];
    });
};

const addReview = (emp: Omit<PerformanceReview, 'id'>): Promise<number> => {
  const { empId, dueDate } = emp;
  const query = {
    text: `INSERT INTO performance_reviews(emp_id, due_date)
    VALUES
    ($1, $2)
    ON CONFLICT ON CONSTRAINT performance_reviews_emp_id_due_date_key
      DO UPDATE SET emp_id = performance_reviews.emp_id
    RETURNING id`,
    values: [empId, dueDate]
  };

  return pool.query(query)
    .then((results: Results<PerformanceReview>) => {
      return results.rows[0].id;
    });
};

const updateReview = (emp: Omit<PerformanceReview, 'empId'>): Promise<number> => {
  console.log('updateReview:', emp);
  const { id, dueDate } = emp;
  const query = {
    text: `UPDATE performance_reviews
      SET
        due_date = $1
      WHERE
        id = $2
      `,
    values: [dueDate, id]
  };

  return pool.query(query).then((result) => {
    return result.rowCount;
  });
};

/**
 * @param prId - Performance review ID
 * @param reviewerIds - Reviewers employee IDs
 */
const setReviewers = (prId: number, reviewerIds: number[]) => {
  // console.log('setReviewers:', prId, reviewerIds);
  const query: pg.QueryConfig = {
    text: `INSERT INTO feedback(id, reviewer_id)
    VALUES ($1, unnest($2::int[]))
    ON CONFLICT ON CONSTRAINT feedback_id_reviewer_id_key
      DO NOTHING`,
    values: [prId, reviewerIds]
  };

  // TODO optimize the following query
  const delQuery = {
    text: `DELETE FROM feedback f
    WHERE
      f.id = $1
    AND
      f.reviewer_id NOT IN (SELECT * from unnest($2::int[]))`,
    values: [prId, reviewerIds]
  };

  return Promise.all([
    pool.query(query),
    pool.query(delQuery)
  ]).then(results => {
    return [results[0].rowCount, results[1].rowCount];
  });
};

const deleteReview = (id: number): Promise<number> => {
  return pool.query('DELETE FROM performance_reviews WHERE id = $1', [id])
    .then((result) => {
      return result.rowCount;
    });
};

const getAllFeedbacks = (): Promise<Feedback[]> => {
  return pool.query(`SELECT * FROM feedback`)
    .then((results: Results<Feedback>) => {
      return results.rows;
    });
};

const getFeedbacks = (empId: number): Promise<Feedback[]> => {
  return pool.query(`SELECT * FROM feedback
    WHERE
    reviewer_id = $1`, [empId])
    .then((results: Results<Feedback>) => {
      return results.rows;
    });
};

const getFeedback = (prId: number): Promise<Feedback[]> => {
  return pool.query(`SELECT * FROM feedback
    WHERE
    id = $1`, [prId])
    .then((results: Results<Feedback>) => {
      return results.rows;
    });
};

const updateFeedback = (feedback: Omit<Feedback, 'assignedDate'>): Promise<number> => {
  console.log('updateFeedback:', feedback);
  const { id, reviewerId, status, response } = feedback;
  const query = {
    text: `UPDATE feedback
      SET
        status = $1,
        response = $2
      WHERE
        id = $3 AND reviewer_id = $4
      `,
    values: [status, response, id, reviewerId]
  };

  return pool.query(query).then((result) => {
    return result.rowCount;
  });
};

export default {
  checkUserCredentials,
  getEmployee,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getReview,
  getReviews,
  addReview,
  setReviewers,
  updateReview,
  deleteReview,
  getAllFeedbacks,
  getFeedback,
  getFeedbacks,
  updateFeedback
};
