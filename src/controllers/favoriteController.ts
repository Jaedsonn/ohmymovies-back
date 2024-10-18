import { Response, Request } from "express";
import { e, IRequest } from "../types/definitions";
import { z } from "zod";
import prisma from "../prisma";

export async function register(req: Request, res: Response) {
  try {
    const { movieId } = req.body;
    const { email } = (req as IRequest).user;

    const userExists = await prisma.user.findFirst({ where: { email } });
    if (!userExists) throw new Error("Usuário não existe");

    const favorite = await prisma.favorite.create({
      data: {
        movieId,
        userId: userExists?.id,
      },
    });
    res
      .status(200)
      .json({ message: "movie favorited", favorite: favorite.movieId });
  } catch (error) {
    type err = z.infer<typeof e>;
    const message = (error as err)?.message || "Request fail";
    res.status(400).json({ error: [message] });
  }
}
