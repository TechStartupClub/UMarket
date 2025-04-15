import express from 'express';
import { getRecentItems, createItem, deleteItem } from '../controllers/marketControllers';

// Create a new router
const router = express.Router();

// recent amount is the query parameter that will be passed to the controller
router.get("/items/recent", getRecentItems);

// Add a route for creating items
router.post("/items", createItem);

// Add a route for deleting items
router.delete("/items/:id", deleteItem);

export default router;