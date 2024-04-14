import { Router } from "express";
import { SignUpController } from "./controller/SignUpController";
import { LoginController } from "./controller/LoginController";

const router = Router();

router.get("/", new LoginController().getProfile);
router.post("/signup", new SignUpController().create);
router.post("/login", new LoginController().auth);

export default router;
