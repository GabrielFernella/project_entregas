import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    //validar se user já existe
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive", //valdia entre maiusculas e minusculas
        },
      },
    });

    if (clientExists) {
      throw new Error("Client already exists");
    }

    // criptografar senha
    const hashPassword = await hash(password, 10);

    // salvar client
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}
