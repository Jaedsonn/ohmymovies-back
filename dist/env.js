"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = __importDefault(require("zod"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const envSchema = zod_1.default.object({
    TOKEN_SECRET: zod_1.default.string(),
    TOKEN_EXPIRATION: zod_1.default.string(),
});
exports.env = envSchema.parse(process.env);
