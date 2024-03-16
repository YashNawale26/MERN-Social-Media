import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); // get the feed posts while verifying the token so that only authenticated users can access the feed posts
router.get("/:userId/posts", verifyToken, getUserPosts); // get only that specific users feed

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); // like a post

export default router;
