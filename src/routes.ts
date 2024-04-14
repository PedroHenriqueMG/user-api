import { Router } from "express";
import { SignUpController } from "./controller/SignUpController";

const router = Router();

router.get("/", (_, res) => {
  return res.send("API online");
});

router.post("/signup", new SignUpController().create);

export default router;
