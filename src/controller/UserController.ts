import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const emailExist = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (emailExist) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: hashPassword,
        },
      });

      const userResponse = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      return res.status(200).json(userResponse);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}