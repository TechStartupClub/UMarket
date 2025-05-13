import express from "express";

import { createItem, deleteItem } from "../controllers/protectedMarketCont";
import { getRecentItems, getUserItems } from "../controllers/publicMarketCont";
import verifyToken from "../middleware/verification";

// Create a new router
const router = express.Router();

// public
router.get("/items/user/:userId", getUserItems);
router.get("/items/recent", getRecentItems);

// protected
router.post("/items/create", verifyToken, createItem);
router.delete("/items/:itemId/delete", verifyToken, deleteItem);

export default router;
