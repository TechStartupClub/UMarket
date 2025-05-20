import { Router } from "express";

import {
  createPost,
  likePost,
  unlikePost,
  updatePost,
} from "../controllers/protectedPostCont";
import { getPostComments } from "../controllers/publicCommentCont";
import { userPosts as getUserPosts } from "../controllers/publicPostCont";
import verifyToken from "../middleware/verification";

const router = Router();

// public
router.get("/user/:userId/posts", getUserPosts);
router.get("/comments/post/:postId", getPostComments);

// protected
router.post("/posts/create", verifyToken, createPost);
router.patch("/posts/:postId/update", verifyToken, updatePost);
router.patch("/posts/:postId/like", verifyToken, likePost);
router.delete("/posts/:postId/unlike", verifyToken, unlikePost);

export default router;
