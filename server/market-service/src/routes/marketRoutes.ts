import { Router } from "express";
import { getUserMarketItems } from "../controllers/marketController";

const router = Router();

// Define the route
router.get("/market/items/user/:userId", async (req, res, next) => {
    try {
        // Call your async controller function
        await getUserMarketItems(req, res);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

export default router;
