import { Router } from "express";
import passport from "../config/passport";
import { googleCallback, verify } from "../controllers/authControllers";

const router = Router();

/**
 * Starts the Google OAuth authentication process.
 * - Requests profile and email permissions.
 */
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * Google OAuth callback endpoint.
 * - Handles authentication and sets a JWT token on successful login.
 */
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    googleCallback
);

/**
 * Verifies the current user's authentication status.
 * - Returns user info if the JWT token is valid.
 */
router.get("/verify", verify);

export default router;