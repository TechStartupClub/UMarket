import {Request, Response} from 'express';

import socialPool from '../config/db';

export const userPosts = async(req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      res.status(400).send({error: 'Invalid user id'});
      return;
    }
    const result = await socialPool.query(
        `
            SELECT up.first_name, up.last_name, up.profile_picture, u.username, p.post_id, p.text_content, p.media_url, p.timestamp 
            FROM posts p 
            JOIN user_profiles up ON p.user_id = up.user_id 
            JOIN users u ON p.user_id = u.user_id
            WHERE p.user_id = $1
        `,
        [userId]);
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};
