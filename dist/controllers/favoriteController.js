"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const prisma_1 = __importDefault(require("../prisma"));
async function register(req, res) {
    try {
        const { movieId, userId } = req.body;
        const userExists = prisma_1.default.user.findFirst({ where: { id: userId } });
        if (!userExists)
            throw new Error("Usuário não existe");
        const favorite = prisma_1.default.favorite.create({
            data: {
                movieId,
                userId,
            },
        });
        res.status(200).json({ message: "movie favorited", favorite });
    }
    catch (error) {
        const message = (error === null || error === void 0 ? void 0 : error.message) || "Request fail";
        res.status(400).json({ error: [message] });
    }
}
