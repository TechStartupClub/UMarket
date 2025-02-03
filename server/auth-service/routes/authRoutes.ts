import { Router } from "express";
import { register, login, logout, generateToken } from "../controllers/authControllers";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/token", generateToken);

export default router;