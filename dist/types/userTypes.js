"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    username: zod_1.z.string().min(5, "username deve ter no mínimo 5 caracteres").optional(),
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(6, "A senha deve ter, no mínimo 6 caracteres"),
});
exports.e = zod_1.z.object({
    message: zod_1.z.string(),
});
