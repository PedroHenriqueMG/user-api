import "express-async-errors";
import Express from "express";
import router from "./routes";
import { errosMiddleware } from "./middleware/error";

const app = Express();
app.use(Express.json());

const PORT = 8080;

app.use(router);

app.use(errosMiddleware);
app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});
