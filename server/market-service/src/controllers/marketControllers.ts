import { Request, Response } from 'express';
import marketPool from '../config/db';

export const getRecentItems = async (req: Request, res: Response): Promise<void> => {
    console.log('Incoming request to getRecentItems:', req.query);

    try {
        // Parse the amount query parameter
        const amount = parseInt(req.query.amount as string, 10) || 10; // Default to 10 if not provided

        // Check if the param 'amount' is a valid number
        if (amount <= 0 || amount > 100) {
            res.status(400).json({ error: 'Amount must be an integer between 1 and 100' });
            return;
        }

        // Query the database for the requested number of items
        const result = await marketPool.query(
            'SELECT item_id, name, price, media_url FROM items LIMIT $1',
            [amount]
        );

        // Check if any items were found
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'No items found' });
            return;
        }

        // Return the items to the client
        res.status(200).json(result.rows);

    } catch (error) {
        // Log the error and return a 500 status code
        console.error('Error fetching recent items:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// create item
export const createItem = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract item data from request body
        const { name, price, description, media_url } = req.body;

        // Validate required fields
        if (!name || !price) {
            res.status(400).json({ error: 'Name and price are required fields' });
            return;
        }

        // Validate price is a positive number
        if (typeof price !== 'number' || price <= 0) {
            res.status(400).json({ error: 'Price must be a positive number' });
            return;
        }

        // Insert the new item into the database
        const result = await marketPool.query(
            'INSERT INTO items (name, price, description, media_url) VALUES ($1, $2, $3, $4) RETURNING item_id, name, price, media_url',
            [name, price, description, media_url]
        );

        // Check if the item was created successfully
        if (result.rows.length === 0) {
            res.status(500).json({ status: 'failed', error: 'Failed to create item' });
            return;
        }

        // Return success response with the created item
        res.status(201).json({
            status: 'success',
            item: result.rows[0]
        });

    } catch (error) {
        // Log the error and return a 500 status code
        console.error('Error creating item:', error);
        res.status(500).json({ status: 'failed', error: 'Server Error' });
    }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get the item ID from the request parameters
        const itemId = req.params.id;

        // Validate that an ID was provided
        if (!itemId) {
            res.status(400).json({ status: 'failed', error: 'Item ID is required' });
            return;
        }

        // Delete the item from the database
        const result = await marketPool.query(
            'DELETE FROM items WHERE item_id = $1 RETURNING item_id',
            [itemId]
        );

        // Check if the item was found and deleted
        if (result.rows.length === 0) {
            res.status(404).json({ status: 'failed', error: 'Item not found' });
            return;
        }

        // Return success response
        res.status(200).json({
            status: 'success',
            message: `Item ${itemId} successfully deleted`
        });

    } catch (error) {
        // Log the error and return a 500 status code
        console.error('Error deleting item:', error);
        res.status(500).json({ status: 'failed', error: 'Server Error' });
    }
};

export const getUserItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            res.status(400).send({ error: "Invalid user id" });
            return;
        }

        const result = await marketPool.query(
            `
                SELECT up.first_name, up.last_name, up.profile_picture, u.username, i.item_id, i.name,
                 i.description, i.price, i.condition, i.timestamp 
                FROM items i
                JOIN user_profiles up ON i.user_id = up.user_id 
                JOIN users u ON i.user_id = u.user_id
                WHERE i.user_id = $1
            `, [userId]
        );
        res.status(200).send(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};