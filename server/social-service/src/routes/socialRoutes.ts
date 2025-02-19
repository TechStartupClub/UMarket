import { Router } from "express";
import { createPost, updatePost, userPosts } from "../controllers/postController";
import { postComments } from "../controllers/commentController";

const router = Router();

router.get("/user/:userId/posts", userPosts);
router.get("/comments/post/:postId", postComments)
router.post("/posts/create", createPost);
router.patch("/posts/update/:postId", updatePost);

export default router;