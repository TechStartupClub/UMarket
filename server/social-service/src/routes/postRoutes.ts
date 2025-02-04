import { Router } from "express";
import { userPosts, postComments } from "../controllers/socialControllers";

const router = Router();

router.get("/social/posts/user/:userId", userPosts);
router.get("/social/comments/post/:postId", postComments)


export default router;