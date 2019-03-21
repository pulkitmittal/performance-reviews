import { Employee } from '../../shared/models/employee.model';
import { User } from '../../shared/models/user.model';
import { Omit } from '../../shared/utils';

interface Results<T> { rows: Array<T>; }

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'qwjszpap',
  host: 'isilo.db.elephantsql.com',
  database: 'qwjszpap',
  password: 'm_VyqLU2pyKDHbj9sbfG502Vn8BH8tMQ',
  port: 5432,
});

const checkUserCredentials = (username: string, password: string): Promise<User> => {
  return pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
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
    text: 'INSERT INTO employees (name, post, department, location) VALUES ($1, $2, $3, $4) RETURNING id',
    values: [name, post, department, location]
  };

  return pool.query(query)
    .then((results: Results<Employee>) => {
      return results.rows[0].id;
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

  return pool.query(query);
};

const deleteEmployee = (id: number): Promise<number> => {
  return pool.query('DELETE FROM employees WHERE id = $1', [id])
    .then((result: any) => {
      return result.rowCount;
    });
};

export default {
  checkUserCredentials,
  getEmployee,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
};
