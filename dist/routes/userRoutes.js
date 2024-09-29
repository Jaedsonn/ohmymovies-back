"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const middleware_1 = require("../middlewares/middleware");
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
exports.router = (0, express_1.Router)();
exports.router.post("/signup", middleware_1.validateUser, userController_1.register, middleware_1.tokenGenerate);
exports.router.post("/login", middleware_1.validateUser, userController_1.login, middleware_1.tokenGenerate);
exports.router.get("/user", middleware_1.tokenVerify, userController_1.userInformations);
