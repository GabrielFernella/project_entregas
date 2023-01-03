import { CreateClientController } from './modules/clients/useCases/createClient/createClientController';
import { Router } from "express";
import { AuthenticateClientController } from './modules/account/authenticateClient/authenticateClientController';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();


routes.post("/client/", createClientController.handle)
routes.post("/authenticate/", authenticateClientController.handle)


export { routes }
