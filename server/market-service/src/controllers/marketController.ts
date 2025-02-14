// import { Request, Response } from "express";
// import router from "../routes/marketRoutes";

// const db = require("../config/db");

// router.get("userid:", async (req: Request, res: Response) => {
// });



// import { Request, Response } from "express";
// import marketPool from "../config/db";

// // Controller function to get all market item listings of a specific user
// export const getUserMarketItems = async (req: Request, res: Response) => {
//     const { userId } = req.params;

//     try {
//         const query = 'SELECT * FROM market_items WHERE user_id = $1';
//         const { rows } = await marketPool.query(query, [userId]);

//         if (rows.length === 0) {
//             return res.status(404).json({ message: "No items found for this user." });
//         }

//         res.status(200).json(rows);
//     } catch (error) {
//         console.error("Error retrieving market items:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// };


import { Request, Response } from "express";
import marketPool from "../config/db";

// Controller function to get all market item listings of a specific user
export const getUserMarketItems = async (req: Request, res: Response) => {
    const { userId } = req.params; 
    console.log(userId); // Log the userId for debugging

    // Validate userId (ensure it's a number before querying)
    if (!userId || isNaN(Number(userId))) {
        console.error("Invalid user ID");

        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const query = 'SELECT * FROM items WHERE user_id = $1'; // select certain columns
        console.log(`Executing query: ${query} with userId: ${userId}`); // Log the query and userId

        const { rows } = await marketPool.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No items found for this user." });
        }
        console.log(`Found ${rows.length} items for userId: ${userId}`);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error retrieving market items:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
