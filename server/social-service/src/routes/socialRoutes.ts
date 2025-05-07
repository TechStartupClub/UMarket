import { Router } from "express";
import { createPost, updatePost, userPosts, likePost } from "../controllers/postController";
import { postComments } from "../controllers/commentController";

const router = Router();

router.get("/user/:userId/posts", userPosts);
router.get("/comments/post/:postId", postComments)
router.post("/posts/create", createPost);
router.patch("/posts/update/:postId", updatePost);
router.patch("/posts/:postId/like", likePost);

export default router;