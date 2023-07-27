import express, { Request, Response } from 'express';
import { Client } from '../entities/Client';

const router = express.Router();

// Configure router with a base url /api/client
router.use('/api/v1/client', router);

router.post('/', async (req: Request, res: Response) => {

    const {
        firstName,
        middleName,
        lastName,
        email,
        cardNumber,
        balance
    } = req.body;

        // Sanitize input
    const sanitizedEmail = email.replace(/<[^>]*>/g, '');

    const client = Client.create({
        firstName,
        middleName,
        lastName,
        email: sanitizedEmail,
        cardNumber,
        balance
    });

    await client.save();
    
    return res.json(client);
});

export {
    router as createClientRouter
};
