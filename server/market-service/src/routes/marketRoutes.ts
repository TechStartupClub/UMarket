import express from 'express';
// importing the getRecentItems function from marketControllers
import { getRecentItems } from '../controllers/marketControllers';

// creating a new router object
const router = express.Router();

// '/items/recent' is the endpoint for this route
// getRecentItems is the controller function that will be called when the endpoint is hit
router.get("/market/items/recent", getRecentItems);

// then export
export default router;