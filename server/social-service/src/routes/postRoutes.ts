import { Router } from "express";
import { userPosts, postComments } from "../controllers/socialControllers";

const router = Router();

router.get("/posts/user/:userId", userPosts);
router.get("/comments/post/:postId", postComments)


export default router;