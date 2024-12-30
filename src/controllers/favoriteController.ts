import { Response, Request } from "express";
import { e, IRequest } from "../types/definitions";
import { z } from "zod";
import prisma from "../prisma";

export async function register(req: Request, res: Response) {
  try {
    const { movieId } = req.body;
    console.log(req.body)
    const { email } = (req as IRequest).user;

    const userExists = await prisma.user.findFirst({ where: { email } });
    if (!userExists) throw new Error("Usuário não existe");

    const favorite = await prisma.favorite.create({
      data: {
        movieId:movieId,
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

export async function getFavorites(req: Request, res: Response) {
  try {
    const { email } = (req as IRequest).user;
    const userExists = await prisma.user.findFirst({ where: { email } });
    if (!userExists) throw new Error("Usuário não existe");

    const favorites = await prisma.favorite.findMany({
      where: { userId: userExists.id },
    });

    res.status(200).json({
      message: "Favorites movies",
      favorite: favorites.map((favorite) => favorite.movieId),
    });
  } catch (error) {
    type err = z.infer<typeof e>;
    const message = (error as err)?.message || "Request fail";
    res.status(400).json({ error: [message] });
  }
}
