import "express-async-errors";
import Express from "express";
import router from "./routes";
import { errosMiddleware } from "./middleware/error";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = Express();
app.use(Express.json());

app.use(router);

prisma
  .$connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

app.use(errosMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`App listing on port ${process.env.PORT}`);
});
