import { Request, Response } from "express";
import { z } from "zod";

import socialPool from "../config/db";

const createPostSchema = z.object({
  text_content: z.string(),
  media_type: z.string().max(50),
  media_url: z.string(),
});

export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parsedData = await createPostSchema.parse(req.body);
    const { text_content, media_type, media_url } = parsedData;
    const user_id = req.user?.user_id;

    const result = await socialPool.query(
      `
                INSERT INTO posts (user_id, text_content, media_type, media_url)
                VALUES ($1, $2, $3, $4)
            `,
      [user_id, text_content, media_type, media_url],
    );
    console.log(result);
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(200).json({ message: "Success" });
};

export const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post_id: number = parseInt(req.params.postId, 10);

    if (isNaN(post_id)) {
      res.status(400).send({ error: "Invalid post id" });
      return;
    }

    const user_id = req.user?.user_id;

    const alreadyContains = await socialPool.query(
      `
      SELECT 1 FROM post_likes WHERE user_id = ($1) AND post_id = ($2)  
      `, [user_id, post_id]
    );

    if (alreadyContains.rowCount !== 0) {
      res.status(409).send({ error: "Already liked this post" });
      return;
    }


    await socialPool.query(
      `
            INSERT INTO post_likes (post_id, user_id)
            VALUES ($1, $2)
        `,
      [post_id, user_id],
    );

    const result = await socialPool.query(
      `
            SELECT post_id::bigint AS estimate FROM post_likes where post_id =  $1;
        `,
      [post_id]
    );

    res.status(200).send({ likeCount: result.rowCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const unlikePost = async (req: Request, res: Response): Promise<void> => {

  try {

    const post_id: number = parseInt(req.params.postId, 10);

    if (isNaN(post_id)) {
      res.status(400).send({ error: "Invalid post id" });
      return;
    }

    const user_id = req.user?.user_id;

    const alreadyContains = await socialPool.query(
      `
      SELECT 1 FROM post_likes WHERE user_id = ($1) AND post_id = ($2)  
      `, [user_id, post_id],
    );

    if (alreadyContains.rowCount === 0) {
      res.status(409).send({ error: "Post is not liked" });
      return;
    }

    await socialPool.query(
      `
     DELETE FROM post_likes WHERE user_id = ($1) AND post_id = ($2)
      `, [user_id, post_id],
    );

    const result = await socialPool.query(
      `
            SELECT post_id::bigint AS estimate FROM post_likes where post_id =  $1;
        `,
      [post_id],
    );
    res.status(200).send({ likeCount: result.rowCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
