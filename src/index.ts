import express, { Express, Request, Response } from "express";
import exampleRoute from "./routes/exampleRoutes";

const app: Express = express();
const port = 5000;

app.use(express.json());
app.use("/", exampleRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
