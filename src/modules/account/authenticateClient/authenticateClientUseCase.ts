import { prisma } from "../../../database/prismaClient";
import {compare} from 'bcrypt'
import { sign } from "jsonwebtoken";


interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUserUseCase {
  async execute({username,password}: IAuthenticateClient) {
    //receber username e password

    //verificar se o username está cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if(!client){
      throw new Error("Username or Password invalid!")
    }
    // cerificar se a senha corresponde

    const passwordMatch = await compare(password, client.password);

    if(!passwordMatch){
      throw new Error("Username or Password invalid!")
    }

    //gerar o token
    const token = sign({username}, "2483a98e8597c6a00d02608cea01b4c9",{
      subject: client.id,
      expiresIn: "1d"
    })

    return token;
  }
}
