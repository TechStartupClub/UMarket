import { Request, Response} from 'express';
import marketPool from '../config/db';

export const getRecentItems = async (req: Request, res: Response) => {
        try {
        // Checking the amount query parameter to see how many items the client wants
        // If nothing, default to 10
        const amount = parseInt(req.query.amount as string, 10) || 10;
        
        // If the amount is greater than 50 or less than 0, return an error
        if(amount <= 0 || amount > 100) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Querying the database for the amount of items the client wants
        const result = await marketPool.query(
            'SELECT item_id, name, price, media_url FROM items LIMIT $1',
            [amount]
        )

        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'No items found' });
        }
        
        // Return the items to the client
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        // Sending back the erorr message to the client
        res.status(500).json( {error: "Server Error" });
    }
};