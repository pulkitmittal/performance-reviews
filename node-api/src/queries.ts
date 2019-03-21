import { LoginResponse } from '@models/login.model';
import { User } from '@models/user.model';
import { Request, Response } from 'express';

import Utils from '../../shared/utils';

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'qwjszpap',
  host: 'isilo.db.elephantsql.com',
  database: 'qwjszpap',
  password: 'm_VyqLU2pyKDHbj9sbfG502Vn8BH8tMQ',
  port: 5432,
});

interface Results<T> { rows: Array<T>; }

const getUsers = (request: Request, response: Response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error: any, results: Results<User>) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const checkUserCredentials = (request: Request, response: Response) => {
  console.log(`Request Body: ${request.body}`);
  let res: LoginResponse;
  const body = request.body || {};
  const username = body.username;
  const password = body.password;

  console.log(`Username: ${username}, Password exists: ${!!password}`);

  if (!username || !password) {
    res = {
      login: false,
      message: 'Please enter both username and password!'
    };
    response.status(400).json(res);
    return;
  }

  pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password],
    (error: any, results: Results<User>) => {
      if (error) {
        throw error;
      }
      if (results.rows[0]) {
        res = {
          login: true,
          user: Utils.pluck(results.rows[0], 'id', 'username', 'role')
        };
        response.status(200).json(res);
      } else {
        res = {
          login: false
        };
        response.status(403).json(res);
      }
    });
};

export default {
  getUsers,
  checkUserCredentials
};
