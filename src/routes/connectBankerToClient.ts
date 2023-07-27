import express, { Request, Response } from 'express';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';

const router = express.Router();

// Configure router with a base url /api/banker
router.use('/api/v1/banker', router);

router.post('/:bankerId/client/:clientId', async (req: Request, res: Response) => {

    const { bankerId, clientId } = req.params;

    const client = await Client.findOne({ where: { id: parseInt(clientId) } });
    const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } });

    if (!client || !banker) {
        return res.status(400).json({
            msg: "Client or Banker not found"
        })
    }

    banker.clients = [client];

    await banker.save();

    return res.json(banker);
});

export {
    router as connectBankerToClientRouter
};
