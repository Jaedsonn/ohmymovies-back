import { validateFavorite } from "../middlewares/middleware";
import { Router } from "express";
import { register } from "../controllers/userController";

export const router = Router();

router.post("/favorite/add", validateFavorite, register);
