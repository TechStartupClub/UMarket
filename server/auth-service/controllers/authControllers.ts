import { Request, Response } from "express";
import bcrypt from "bcrypt";

const db = require("../config/db");

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ 
                success: false, 
                message: "Username, email, and password are required" 
            });
            return;
        }

        // Check if the user already exists
        const userExistsQuery = `SELECT * FROM users WHERE username = $1 OR email = $2`;
        const userExistsParams = [username, email];
        const existingUser = await db.query(userExistsQuery, userExistsParams);

        if (existingUser.rows.length > 0) {
            res.status(409).json({
                success: false,
                message: "User with these credentials already exists"
            });
            return;
        }

        // Insert new user into the users table
        const insertUserQuery = `
            INSERT INTO users (username, email)
            VALUES ($1, $2)
            RETURNING user_id, auth_provider
        `;
        const insertUserParams = [username, email];
        const userResult = await db.query(insertUserQuery, insertUserParams);
        
        const userId = userResult.rows[0].user_id;
        const authProvider = userResult.rows[0].auth_provider;

        // Insert new entry into the user_auths table
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertAuthQuery = `
            INSERT INTO user_auths (user_id, hashed_password, auth_method) 
            VALUES ($1, $2, $3)
            RETURNING user_id, created_at
        `;
        const insertAuthParams = [userId, hashedPassword, authProvider];
        const authResult = await db.query(insertAuthQuery, insertAuthParams);

        console.log(`${authResult.rows[0].created_at} - User ${authResult.rows[0].user_id} Registered`);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                user_id: userId,
                username,
                email,
                created_at: authResult.rows[0].created_at
            }
        });
    } catch (error: any) {
        console.error("Error during user registration:", error.message);

        if (error.code === "23505") { // PostgreSQL unique_violation error code
            res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        } else {
            res.status(500).json({
                success: false,
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {

};

export const logout = async (req: Request, res: Response): Promise<void> => {

};

export const generateToken = async (req: Request, res: Response): Promise<void> => {

};