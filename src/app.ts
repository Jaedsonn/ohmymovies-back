import express, { json, Express } from "express";
import cors from "cors";
import { router } from "./routes/userRoutes";

const app: Express = express();
const port: number = 4001;
app.use(json());
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Server running in: http://localhost:${port}`);
});
