import {Request, Response} from 'express'
import { CreateClientUseCase } from './createClientUseCase'

export class CreateClientController{
  async handle(request: Request, response: Response){

    const {username, password} = request.body;

    const createClient  = new CreateClientUseCase();

    const result = await createClient.execute({
      username,
      password
    });

    return response.json(result);
  }
}