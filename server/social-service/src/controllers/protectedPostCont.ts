import {Request, Response} from 'express';
import {z} from 'zod';

import socialPool from '../config/db';

const createPostSchema = z.object({
  user_id: z.number().int(),
  text_content: z.string(),
  media_type: z.string().max(50),
  media_url: z.string()
});

const likePostSchema = z.object({user_id: z.number().int()});

export const createPost = async(req: Request, res: Response):
    Promise<void> => {
      try {
        const parsedData = createPostSchema.parse(req.body);
        const {user_id, text_content, media_type, media_url} = parsedData;

        const result = await socialPool.query(
            `
                INSERT INTO posts (user_id, text_content, media_type, media_url)
                VALUES ($1, $2, $3, $4)
            `,
            [user_id, text_content, media_type, media_url]);
        console.log(result)
        res.status(200).json({
          message: 'Success',
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server error'});
      }
    }

export const updatePost = async(req: Request, res: Response):
    Promise<void> => {
      res.status(200).json({message: 'Success'});
    }

export const likePost = async(req: Request, res: Response): Promise<void> => {
  try {
    const post_id: number = parseInt(req.params.postId, 10)

    if (isNaN(post_id)) {
      res.status(400).send({error: 'Invalid user id'});
      return;
    }

    const parsedData = likePostSchema.parse(req.body);
    const {user_id} = parsedData;

    await socialPool.query(
        `
            INSERT INTO post_likes (post_id, user_id)
            VALUES ($1, $2)
        `,
        [post_id, user_id]);

    const result = await socialPool.query(
        `
            SELECT post_id::bigint AS estimate FROM post_likes where post_id =  $1; 
        `,
        [post_id]);

    res.status(200).send({likeCount: result.rowCount});

  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
}