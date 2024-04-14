import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface JwtPayLoad {
  id: string;
}

const prisma = new PrismaClient();

export class LoginController {
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? " ", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = user;

    return res.json({
      user: userLogin,
      token: token,
    });
  }

  async getProfile(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedError("Faça login para ter acesso a essa rota");
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? " ") as JwtPayLoad;

    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new UnauthorizedError("Faça login para ter acesso a essa rota");
    }

    const { password: _, ...loggedUser } = user;

    return res.json(loggedUser);
  }
}
