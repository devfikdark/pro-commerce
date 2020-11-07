import * as express from "express";
import { appRoutes } from './router/appRouter';

class App {
  public app: express.Application;
  public appRouter: appRoutes = new appRoutes();

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.appRouter.routes(this.app);
  }
}

export default new App().app;