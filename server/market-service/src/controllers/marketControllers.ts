import marketPool from '../config/db';

export const getRecentItems = async (req: any, res: any) => {
    const { amount = 10, page = 1 } = req.query; // Default values

    try {
        const result = await marketPool.query(
            'SELECT itemId, itemName, price, image FROM items ORDER',
            [amount]
        );

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};