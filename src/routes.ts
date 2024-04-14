import { Router } from "express";
import { SignUpController } from "./controller/SignUpController";
import { LoginController } from "./controller/LoginController";

const router = Router();

router.get("/", (_, res) => {
  return res.send("API online");
});

router.post("/signup", new SignUpController().create);
router.post("/login", new LoginController().auth);

export default router;
