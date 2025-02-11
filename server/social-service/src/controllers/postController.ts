import { Request, Response } from "express";
import socialPool from "../config/db";

export const userPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            res.status(400).send({ error: "Invalid user id"});
            return;
        }
        const result = await socialPool.query(
            'SELECT * FROM posts WHERE user_id = $1', [userId]
        )
        res.status(200).send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
};