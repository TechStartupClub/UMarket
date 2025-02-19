import express from 'express';
import { getRecentItems } from '../controllers/marketControllers'; // Import the controller function

// Create a new router
const router = express.Router();

// ../recent?amount=00 is the query parameter that will be passed to the controller
router.get("/recent", getRecentItems);

export default router;