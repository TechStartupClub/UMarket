import { Request, Response } from "express";

const db = require("../config/db");

export const userPosts = async (req: Request, res: Response): Promise<void> => {
    console.log(req.params);
    res.status(200).json({
        message: "User posts",
    })
};

export const postComments = async (req: Request, res: Response): Promise<void> => {

};