import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import methodOverride from 'method-override';
import uniqid from 'uniqid';

import Errors from '../../shared/errors';
import api from './api';
import auth from './auth';

class App {

  public app: core.Express;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(methodOverride());

    // make sure the incoming requests are all XHR
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      if (!req.xhr) {
        const { code, message } = Errors.notXHR();
        res.status(code).json(message);
      } else {
        next();
      }
    });

    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    // Authentication
    router.post('/login', auth.login);
    router.post('/logout', auth.logout);

    // Employee related
    router.get('/employees', auth.ifAdmin, (req, res) => wrapper(api.getEmployees, req, res));
    router.post('/employees', auth.ifAdmin, (req, res) => wrapper(api.addEmployee, req, res));
    router.get('/employees/:id', auth.ifAdmin, (req, res) => wrapper(api.getEmployee, req, res));
    router.put('/employees/:id', auth.ifAdmin, (req, res) => wrapper(api.updateEmployee, req, res));
    router.delete('/employees/:id', auth.ifAdmin, (req, res) => wrapper(api.deleteEmployee, req, res));

    // Reviews related
    router.get('/reviews', auth.ifAdmin, (req, res) => wrapper(api.getReviews, req, res));
    router.post('/reviews', auth.ifAdmin, (req, res) => wrapper(api.addReview, req, res));
    router.get('/reviews/:id', auth.ifAdmin, (req, res) => wrapper(api.getReview, req, res));
    router.put('/reviews/:id', auth.ifAdmin, (req, res) => wrapper(api.updateReview, req, res));
    router.delete('/reviews/:id', auth.ifAdmin, (req, res) => wrapper(api.deleteReview, req, res));

    // Feedback (data returned is for logged in user)
    router.get('/feedback', auth.ifAuthenticated, (req, res) => wrapper(api.getFeedbacks, req, res));
    router.put('/feedback/:id', auth.ifAuthenticated, (req, res) => wrapper(api.updateFeedback, req, res));

    this.app.use('/', router);
  }

}

function wrapper(func: (req: Request, res: Response) => Promise<void>,
  req: Request, res: Response) {
  try {
    const reqId = uniqid();
    console.log('Processing request:', reqId, req.method, req.path, req.params);
    func.call(null, req, res)
      .then(() => {
        if (res.headersSent) {
          console.log('Request processed:', reqId);
        }
      })
      .catch((err: any) => handleErrors(err, req, res));
  } catch (err) {
    handleErrors(err, req, res);
  }
}

function handleErrors(err: any, req: Request, res: Response) {
  console.error('[Error]', err.stack);
  const { code, message } = Errors.unregrettableError();
  res.status(code).send(err.stack || { error: message });
}

export default new App().app;
