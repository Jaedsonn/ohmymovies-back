"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const prisma_1 = __importDefault(require("../prisma"));
async function register(req, res) {
    try {
        const { movieId } = req.body;
        const { email } = req.user;
        const userExists = await prisma_1.default.user.findFirst({ where: { email } });
        if (!userExists)
            throw new Error("Usuário não existe");
        const favorite = await prisma_1.default.favorite.create({
            data: {
                movieId,
                userId: userExists === null || userExists === void 0 ? void 0 : userExists.id,
            },
        });
        res
            .status(200)
            .json({ message: "movie favorited", favorite: favorite.movieId });
    }
    catch (error) {
        const message = (error === null || error === void 0 ? void 0 : error.message) || "Request fail";
        res.status(400).json({ error: [message] });
    }
}
