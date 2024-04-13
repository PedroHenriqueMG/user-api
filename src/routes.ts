import { Router } from "express";
import { UserController } from "./controller/UserController";

const router = Router();

router.get("/", (_, res) => {
  return res.send("API online");
});

router.post("/signup", new UserController().create);

export default router;
