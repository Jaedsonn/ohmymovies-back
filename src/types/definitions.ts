import { z } from "zod";
import { Request } from "express";

export const UserSchema = z.object({
  username: z
    .string()
    .min(5, "username deve ter no mínimo 5 caracteres")
    .optional(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter, no mínimo 6 caracteres"),
});

export const FavoriteSchema = z.object({
  movieId: z.number(),
});

export type favorite = z.infer<typeof FavoriteSchema>;

export type user = z.infer<typeof UserSchema>;

export const e = z.object({
  message: z.string(),
});

export interface IRequest extends Request {
  user: user;
}
