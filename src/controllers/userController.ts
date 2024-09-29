import { NextFunction, Response, Request } from "express";
import prisma from "../prisma";
import { hash, genSaltSync, compare } from "bcryptjs";
import { findUser } from "../utils/findUser";
import { IRequest, e } from "../types/userTypes";
import { z } from "zod";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password } = req.body;

    await findUser(email);

    const salt = genSaltSync(8);
    const hash_password = await hash(password, salt);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash_password,
      },
    });
    (req as IRequest).user = user;
    next();
  } catch (error) {
    type err = z.infer<typeof e>;
    const message = (error as err)?.message || "Request fail";
    res.status(400).json({ error: [message] });
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User don't exists");
    }
    const isMathc = compare(password, user.password);
    if (!isMathc) {
      throw new Error("Email or password missing");
    }
    (req as IRequest).user = user;
    next();
  } catch (error) {
    type err = z.infer<typeof e>;
    const message = (error as err)?.message || "Request fail";
    res.status(400).json({ error: [message] });
  }
}

export async function userInformations(req: Request, res: Response) {
  try {
    const { email } = (req as IRequest).user;
    const user = await prisma.user.findUnique({ where: { email } });
    
    res.status(200).json({ user });
  } catch (error) {
    type err = z.infer<typeof e>;
    const message = (error as err)?.message || "Request fail";
    res.status(400).json({ error: [message] });
  }
}
