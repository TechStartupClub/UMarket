import express from 'express';
import { getRecentItems, getUserItems, createItem, deleteItem } from '../controllers/marketControllers';

// Create a new router
const router = express.Router();

// recent amount is the query parameter that will be passed to the controller
router.get("/items/recent", getRecentItems);
router.get("/items/create", createItem)
router.get("/items/:itemId/delete", deleteItem)
router.get("/items/user/:userId", getUserItems)

export default router;