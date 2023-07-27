import express, { Request, Response } from 'express';
import { Banker } from '../entities/Banker';

const router = express.Router();

// Configure router with a base url /api/banker
router.use('/api/v1/banker', router);

router.post('/', async (req: Request, res: Response) => {

    const {
        firstName,
        middleName,
        lastName,
        email,
        cardNumber,
        employeeNumber
    } = req.body;

        // Sanitize input
    const sanitizedEmail = email.replace(/<[^>]*>/g, '');

    const banker = Banker.create({
        firstName,
        middleName,
        lastName,
        email: sanitizedEmail,
        cardNumber,
        employeeNumber
    });

    await banker.save()

    return res.json(banker);
});

export {
    router as createBankerRouter
};
