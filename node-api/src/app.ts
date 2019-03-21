import bodyParser from 'body-parser';
import express from 'express';

import queries from './queries';

class App {

  public app: any;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    router.get('/', (req, res) => {
      res.send(`Hello World!`);
    });

    router.get('/users', (req, res) => {
      queries.getUsers(req, res);
    });

    router.post('/login', (req, res) => {
      queries.checkUserCredentials(req, res);
    });

    this.app.use('/', router);
  }
}

export default new App().app;
