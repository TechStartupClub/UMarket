import { Request, Response } from "express";
import socialPool from "../config/db";

export const postComments = async (req: Request, res: Response): Promise<void> => {
    console.log(req.params);
    try {
        // const result = await socialPool.query(
        // )
        // res.send(result)
        res.status(200).json({
            message: "hello from post comments"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
};