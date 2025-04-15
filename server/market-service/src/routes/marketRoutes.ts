import express from 'express';
import { getRecentItems, createItem } from '../controllers/marketControllers';

// Create a new router
const router = express.Router();

// recent amount is the query parameter that will be passed to the controller
router.get("/items/recent", getRecentItems);

// post route for creating items
router.post("/items", createItem);
export default router;