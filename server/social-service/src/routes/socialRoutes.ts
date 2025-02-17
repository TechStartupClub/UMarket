import { Router } from "express";
import { userPosts } from "../controllers/postController";
import {postComments} from "../controllers/commentController";

const router = Router();

router.get("/user/:userId/posts", userPosts);
router.get("/comments/post/:postId", postComments)

export default router;