import express, { json, Express } from "express";
import cors from "cors";
import { router as userRouter } from "./routes/userRoutes";
import { router as favoriteRouter } from "./routes/favoriteRoutes";

const app: Express = express();
const port: number = 4001;
app.use(json());
app.use(cors());

app.use("/user", userRouter);
app.use(favoriteRouter);

app.listen(port, () => {
  console.log(`Server running in: http://localhost:${port}`);
});
