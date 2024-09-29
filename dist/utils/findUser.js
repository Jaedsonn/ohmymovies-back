"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = findUser;
const prisma_1 = __importDefault(require("../prisma"));
async function findUser(email) {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (user) {
        throw new Error("User already exixts");
    }
}
