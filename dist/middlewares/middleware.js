"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerate = exports.validateFavorite = exports.validateUser = void 0;
exports.tokenVerify = tokenVerify;
const jsonwebtoken_1 = require("jsonwebtoken");
const definitions_1 = require("../types/definitions");
const zod_1 = require("zod");
const dotenv_1 = require("dotenv");
const env_1 = require("../env");
(0, dotenv_1.configDotenv)();
const validateUser = (req, res, next) => {
    var _a;
    try {
        definitions_1.UserSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const erros = (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((e) => e.message);
            res.status(400).json({ erros });
            return;
        }
        res.status(400).json({ error: [error] });
        return;
    }
};
exports.validateUser = validateUser;
const validateFavorite = (req, res, next) => {
    try {
        definitions_1.FavoriteSchema.parse(req.body);
        next();
    }
    catch (_error) {
        res.status(400).json({ error: ["fields missing"] });
        return;
    }
};
exports.validateFavorite = validateFavorite;
const tokenGenerate = (req, res) => {
    try {
        const { email, password } = req.user;
        const token = (0, jsonwebtoken_1.sign)({ email, password }, env_1.env.TOKEN_SECRET, {
            expiresIn: env_1.env.TOKEN_EXPIRATION,
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
exports.tokenGenerate = tokenGenerate;
async function tokenVerify(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new Error("Missing token");
        }
        const [, token] = authorization.split(" ");
        const data = (0, jsonwebtoken_1.verify)(token, env_1.env.TOKEN_SECRET);
        const user = data;
        req.user = user;
        next();
    }
    catch (_e) {
        res.status(401).json({
            errors: ["Token expired or Invalid"],
        });
    }
}
