import { sign, verify } from "jsonwebtoken";
import { IRequest, user, UserSchema } from "./../types/userTypes";
import { Response, NextFunction, Request } from "express";
import { ZodError } from "zod";
import { configDotenv } from "dotenv";
import { env } from "../env";

configDotenv();

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UserSchema.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const erros = error?.issues?.map((e) => e.message);
      res.status(400).json({ erros });
      return;
    }
    res.status(400).json({ error: [error] });
    return;
  }
};

export const tokenGenerate = (req: Request, res: Response) => {
  try {
    const { email, password } = (req as IRequest).user;
    const token = sign({ email, password }, env.TOKEN_SECRET!, {
      expiresIn: env.TOKEN_EXPIRATION,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export async function tokenVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    res.status(401).json({
      errors: ["Login required"],
    });
  }
  const [, token] = authorization!.split(" ");

  try {
    const data = verify(token, env.TOKEN_SECRET);
    const user = data as user;

    (req as IRequest).user = user;
  } catch (e) {
    const err = e || "token expired or invalid";
    res.status(401).json({
      errors: [err],
    });
  }

  next();
}
