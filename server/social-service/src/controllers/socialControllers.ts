import { Request, Response } from "express";
import socialPool from "../config/db";

export const userPosts = async (req: Request, res: Response): Promise<void> => {
    console.log(req.params);
    try {
        // const result = await socialPool.query(
        //     'SELECT * FROM posts WHERE userId = $1', [req.params]
        // )
        res.status(200).json({
            message: "replace with result"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
};

export const postComments = async (req: Request, res: Response): Promise<void> => {

};