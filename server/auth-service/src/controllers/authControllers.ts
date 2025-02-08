import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authPool from "../config/db";

interface User {
    google_id: string;
    display_name: string;
    email: string;
};

interface DecodedUser extends User {
    iat?: number;
    exp?: number;
};

export const googleCallback = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Authentication failed" });
        return;
    }

    const user = req.user as User;

    // generate access token
    const token = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "30m" });

    // set access token in cookies
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" }); // adjust for HTTPS later

    // decide on refresh token later

    /*
    CHANGE THE REDIRECT ROUTE FOR WHATEVER NEEDED
    */
    res.redirect("http://localhost:5173/profile");
};

export const verify = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorized user" });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
        res.json(user);
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};