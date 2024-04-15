import "express-async-errors";
import Express from "express";
import router from "./routes";
import { errosMiddleware } from "./middleware/error";

const app = Express();
app.use(Express.json());

app.use(router);

app.use(errosMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`App listing on port ${process.env.PORT}`);
});
