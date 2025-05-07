import { Request, Response } from "express";
import { z } from 'zod';
import socialPool from "../config/db";

const createPostSchema = z.object({
    user_id: z.number().int(),
    text_content: z.string(),
    media_type: z.string().max(50),
    media_url: z.string()
});

const likePostSchema = z.object({
    user_id: z.number().int()
});

export const userPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            res.status(400).send({ error: "Invalid user id" });
            return;
        }
        const result = await socialPool.query(
            `
            SELECT up.first_name, up.last_name, up.profile_picture, u.username, p.post_id, p.text_content, p.media_url, p.timestamp 
            FROM posts p 
            JOIN user_profiles up ON p.user_id = up.user_id 
            JOIN users u ON p.user_id = u.user_id
            WHERE p.user_id = $1
            `, [userId]
        );
        res.status(200).send(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedData = createPostSchema.parse(req.body);
        const { user_id, text_content, media_type, media_url } = parsedData;

        const result = await socialPool.query(
            `
            INSERT INTO posts (user_id, text_content, media_type, media_url)
            VALUES ($1, $2, $3, $4)
            `, [user_id, text_content, media_type, media_url]
        );
        console.log(result)
        res.status(200).json({
            message: "Success",
            // postId: result.rows[0]?.id 
        });;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const updatePost = async (req: Request, res: Response): Promise<void> => {

    res.status(200).json({ message: "Success" });
}

export const likePost = async (req: Request, res: Response): Promise<void> => {

    try {
        const post_id: number = parseInt(req.params.postId, 10)

        if (isNaN(post_id)) {
            res.status(400).send({ error: "Invalid user id" });
            return;
        }

        const parsedData = likePostSchema.parse(req.body);
        const { user_id } = parsedData;

        const like = await socialPool.query(
            `
            INSERT INTO post_likes (post_id, user_id)
            VALUES ($1, $2)
            `, [post_id, user_id]
        );

        const result = await socialPool.query(
            `
            SELECT post_id::bigint AS estimate FROM post_likes where post_id =  $1; 
            `, [post_id]
        );

        res.status(200).send({ likeCount: result.rowCount });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }

}