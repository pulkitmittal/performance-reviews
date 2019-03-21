import bodyParser from 'body-parser';
import express from 'express';
import * as core from 'express-serve-static-core';
import methodOverride from 'method-override';

import api from './api';
import auth from './auth';

class App {

  public app: core.Express;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(methodOverride());
    this.app.use(logErrors);
    this.app.use(clientErrorHandler);
    this.app.use(errorHandler);

    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    // Authentication
    router.post('/login', auth.login);
    router.post('/logout', auth.logout);

    // Employee related
    router.get('/employees', auth.ifAdmin, api.getEmployees);
    router.post('/employees', auth.ifAdmin, api.addEmployee);
    router.get('/employees/:id', auth.ifAdmin, api.getEmployee);
    router.put('/employees/:id', auth.ifAdmin, api.updateEmployee);
    router.delete('/employees/:id', auth.ifAdmin, api.deleteEmployee);

    // Reviews related
    router.get('/reviews');
    router.post('/reviews');
    router.get('/reviews/:id');
    router.put('/reviews/:id');

    // Feedback
    router.put('/feedback/:id');

    this.app.use('/', router);
  }

}

function logErrors(err: any, req: core.Request, res: core.Response, next: core.NextFunction): any {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err: any, req: core.Request, res: core.Response, next: core.NextFunction): any {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err: any, req: core.Request, res: core.Response, next: core.NextFunction): any {
  res.status(500);
  res.render('error', { error: err });
}

export default new App().app;
