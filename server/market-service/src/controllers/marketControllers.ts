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