import { appController } from '../controllers/appController'

export class appRoutes {
  public appController: appController = new appController() 

  public routes(app): void {
    //app.get('/', this.appController.getData);
    app.post('/api/signup', this.appController.signUp);
  }
}