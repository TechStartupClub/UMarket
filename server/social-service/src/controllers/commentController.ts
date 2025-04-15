import { Request, Response } from "express";
import socialPool from "../config/db";

export const postComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const postId: number = parseInt(req.params.postId, 10);
        if (isNaN(postId)) {
            res.status(400).json({ error: "Invalid post id" });
            return;
        }
        const result = await socialPool.query(
            `
            SELECT u.username, c.post_id, c.user_id, c.text_content, c.timestamp
            FROM comments c 
            JOIN users u ON c.user_id = u.user_id 
            WHERE post_id = $1
            `, [postId]
        );
        res.status(200).send(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};