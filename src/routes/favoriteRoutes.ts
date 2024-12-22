import { tokenVerify, validateFavorite } from "../middlewares/middleware";
import { Router } from "express";
import { register, getFavorites } from "../controllers/favoriteController";

export const router = Router();

router.post("/favorite/add", validateFavorite, tokenVerify, register);
router.get("/favorites", tokenVerify, getFavorites)
