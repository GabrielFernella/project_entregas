import {Request, Response} from 'express'
import { AuthenticateClientUserUseCase } from './authenticateClientUseCase'

export class AuthenticateClientController{
  async handle(request: Request, response: Response){

    const {username, password} = request.body;

    const authenticate  = new AuthenticateClientUserUseCase();

    const result = await authenticate.execute({
      username,
      password
    });

    return response.json(result);
  }
}
