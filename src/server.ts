import Express from "express";
import router from "./routes";

const app = Express();
app.use(Express.json());

const PORT = 8080;

app.use(router);

app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});
