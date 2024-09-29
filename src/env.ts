import z from "zod";
import { configDotenv } from "dotenv";
configDotenv()

const envSchema = z.object({
  TOKEN_SECRET: z.string(),
  TOKEN_EXPIRATION: z.string(),
});

export const env = envSchema.parse(process.env);
