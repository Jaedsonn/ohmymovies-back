import {
  tokenGenerate,
  validateUser,
  tokenVerify,
} from "../middlewares/middleware";
import { Router } from "express";
import {
  login,
  register,
  userInformations,
} from "../controllers/userController";

export const router = Router();

router.post("/signup", validateUser, register, tokenGenerate);
router.post("/login", validateUser, login, tokenGenerate);
router.get("/user", tokenVerify, userInformations);
