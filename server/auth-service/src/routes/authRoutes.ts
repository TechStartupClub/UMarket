import { Router } from "express";
import passport from "passport";
import { googleCallback, verify } from "../controllers/authControllers";

const router = Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    googleCallback
);

router.get("/verify", verify);

export default router;