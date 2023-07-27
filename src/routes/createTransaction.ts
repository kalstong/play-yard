import express, { Request, Response } from 'express';
import { Transaction, TransactionTypes } from '../entities/Transaction';
import { Client } from '../entities/Client';
import { NotFoundError } from '../helper/ApiErrors';

const router = express.Router();

// Configure router with a base url /api/banker
router.use('/api/v1/client', router);

router.post('/:clientId/transaction', async (req: Request, res: Response) => {

    const { clientId } = req.params;
    const { type, amount } = req.body;

    const client = await Client.findOne({
        where: {
            id: parseInt(clientId)
        }
    });

    if (!client) {
        throw new NotFoundError('Client not found');
    }

    const transaction = Transaction.create({
        amount,
        type,
        client
    });
    
    const { AppDataSource } = await import('../repositories/typeormRepository');
    await AppDataSource.manager.transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(transaction);

        if (type === TransactionTypes.DEPOSIT) {
            client.balance += amount;
        } else if (type === TransactionTypes.WITHDRAW) {
            client.balance -= amount;
        }

        await transactionalEntityManager.save(client);
    });

    return res.json(client);

});

export {
    router as createTransactionRouter
};
