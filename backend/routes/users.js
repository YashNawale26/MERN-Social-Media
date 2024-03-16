import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser); 
router.get(":id/friends", verifyToken, getUserFriends);  //used to get the friends of the user

/* UPDATE */ 
router.patch("/:id/:friendID", verifyToken,  addRemoveFriend); //used to add or remove a friend

export default router;

