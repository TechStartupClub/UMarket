import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authPool from "../config/db";

interface User {
  google_id: string;
  display_name: string;
  email: string;
}

interface DecodedUser extends User {
  iat?: number;
  exp?: number;
}

/**
 * Handles the Google OAuth callback.
 * - Generates an access token for the user.
 * - Sets the token in cookies for subsequent requests.
 */
export const googleCallback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Authentication failed" });
    return;
  }

  const user = req.user as User;

  // generate and set access token
  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: "30m",
  });
  res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

  // decide on refresh token later

  // FIXME: CHANGE THE REDIRECT ROUTE FOR WHATEVER NEEDED
  res.redirect("http://localhost:5173/profile");
};

/**
 * Verifies the JWT token from cookies.
 * - Returns user information if valid token is present.
 * - Sends 401 if token is missing or invalid.
 */
export const verify = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized user" });
    return;
  }

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedUser;
    res.json(user);
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
