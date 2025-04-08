import express from 'express';
import { getRecentItems } from '../controllers/marketControllers';

const router = express.Router();

router.get('/items/recent', getRecentItems);

export default router;