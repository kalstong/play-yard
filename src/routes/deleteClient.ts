import express, { Request, Response } from 'express';
import { Client } from '../entities/Client';

const router = express.Router();

// Configure router with a base url /api/client
router.use('/api/v1/client', router);

router.delete('/:clientId', async (req: Request, res: Response) => {
    const { clientId } = req.params;


    const response = await Client.delete({
        id: parseInt(clientId)
    });

    return res.json(response);
});

export {
    router as deleteClientRouter
};