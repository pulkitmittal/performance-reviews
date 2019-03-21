import { NextFunction, Request, Response } from 'express';
import uniqid from 'uniqid';

import Errors from '../../shared/errors';
import { LoginResponse } from '../../shared/models/login.model';
import { User, UserRole } from '../../shared/models/user.model';
import Utils from '../../shared/utils';
import queries from './queries';

const userTokens = new Map<string, User>();

// Added only for testing APIs - TODO remove this
userTokens.set(
  '12345', {
    id: 1,
    username: 'smith',
    password: 'passw0rd',
    role: UserRole.ADMIN
  }
);

const getAuthToken = (request: Request): string => {
  return String(request.headers.token || '');
};

const getAuthUser = (request: Request): User => {
  const token = getAuthToken(request);
  const user = token && userTokens.get(token);
  return user;
};

const isAuthenticated = (request: Request): boolean => {
  const token = getAuthToken(request);
  return token && userTokens.has(token);
};

const ifAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  if (!getAuthToken(request)) {
    const { code, message } = Errors.noToken();
    response.status(code).json(message);
  } else if (!isAuthenticated(request)) {
    const { code, message } = Errors.unAuthorized();
    response.status(code).json(message);
  } else {
    next();
  }
};

const isAdmin = (request: Request): boolean => {
  const user = getAuthUser(request);
  return user && user.role === UserRole.ADMIN;
};

const ifAdmin = (request: Request, response: Response, next: NextFunction) => {
  if (!getAuthToken(request)) {
    console.log('no token');
    const { code, message } = Errors.noToken();
    response.status(code).json(message);
  } else if (!isAdmin(request)) {
    console.log('is not admin');
    const { code, message } = Errors.unAuthorized();
    response.status(code).json(message);
  } else {
    next();
  }
};

const login = (request: Request, response: Response) => {
  let res: LoginResponse;
  const body = request.body || {};
  const username = body.username;
  const password = body.password;

  console.log(`Username: ${username}, Password exists: ${!!password}`);

  if (!username || !password) {
    const { code, message } = Errors.noUsernamePassword();
    res = {
      login: false,
      message: message
    };
    response.status(code).json(res);
    return;
  }

  queries.checkUserCredentials(username, password)
    .then(user => {
      if (user) {
        res = {
          login: true,
          user: Utils.pluck(user, 'id', 'username', 'role'),
          token: uniqid()
        };
        userTokens.set(res.token, user);
        response.status(200).json(res);
      } else {
        const { code, message } = Errors.wrongCredentials();
        res = {
          login: false,
          message: message
        };
        response.status(code).json(res);
      }
    });
};

const logout = (request: Request, response: Response) => {
  if (isAuthenticated(request)) {
    const token = getAuthToken(request);
    if (token) {
      userTokens.delete(token);
    }
  }
  response.status(200).json({});
};

export default {
  login,
  logout,
  ifAuthenticated,
  ifAdmin
};
