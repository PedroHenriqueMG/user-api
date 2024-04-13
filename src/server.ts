import Express from "express";

const app = Express();
app.use(Express.json());

const PORT = 8080;

app.get("/", (req, res) => {
  return res.send({ message: "API online" });
});

app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});
