import { Response, Request } from "express";
import { e } from "../types/definitions";
import { z } from "zod";
import prisma from "../prisma";

export async function register(req: Request, res: Response) {
  try {
    const { movieId, userId } = req.body;

    const userExists = prisma.user.findFirst({ where: { id: userId } });
    if (!userExists) throw new Error("Usuário não existe");

    const favorite = prisma.favorite.create({
      data: {
        movieId,
        userId,
      },
    });

    res.status(200).json({ message: "movie favorited", favorite });
  } catch (error) {
    type err = z.infer<typeof e>;
    const message = (error as err)?.message || "Request fail";
    res.status(400).json({ error: [message] });
  }
}
