"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.userInformations = userInformations;
const prisma_1 = __importDefault(require("../prisma"));
const bcryptjs_1 = require("bcryptjs");
const findUser_1 = require("../utils/findUser");
async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;
        await (0, findUser_1.findUser)(email);
        const salt = (0, bcryptjs_1.genSaltSync)(8);
        const hash_password = await (0, bcryptjs_1.hash)(password, salt);
        const user = await prisma_1.default.user.create({
            data: {
                username,
                email,
                password: hash_password,
            },
        });
        req.user = user;
        next();
    }
    catch (error) {
        const message = (error === null || error === void 0 ? void 0 : error.message) || "Request fail";
        res.status(400).json({ error: [message] });
    }
}
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error("User don't exists");
        }
        const isMathc = await (0, bcryptjs_1.compare)(password, user.password);
        console.log(isMathc);
        if (!isMathc) {
            throw new Error("Email or password missing");
        }
        req.user = user;
        next();
    }
    catch (error) {
        const message = (error === null || error === void 0 ? void 0 : error.message) || "Request fail";
        res.status(400).json({ error: [message] });
    }
}
async function userInformations(req, res) {
    try {
        const { email } = req.user;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        res.status(200).json({ user });
    }
    catch (error) {
        const message = (error === null || error === void 0 ? void 0 : error.message) || "Request fail";
        res.status(400).json({ error: [message] });
    }
}
