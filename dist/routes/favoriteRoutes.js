"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const middleware_1 = require("../middlewares/middleware");
const express_1 = require("express");
const favoriteController_1 = require("../controllers/favoriteController");
exports.router = (0, express_1.Router)();
exports.router.post("/favorite/add", middleware_1.tokenVerify, favoriteController_1.register);
exports.router.get("/favorites", middleware_1.tokenVerify, favoriteController_1.getFavorites);
