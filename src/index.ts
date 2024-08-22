import express, { Express, Request, Response } from "express";
import sheetsRoute from "./routes/sheetsRoutes";

const app: Express = express();
const port = 5000;

app.use(express.json());

app.use("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});

app.use("/sheets", sheetsRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
