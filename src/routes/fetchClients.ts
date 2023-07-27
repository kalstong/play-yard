import express, {  Request, Response} from 'express';
import { Client } from '../entities/Client';
import { createQueryBuilder } from 'typeorm';

const router = express.Router();

// Configure router with a base url /api/client
router.use('/api/v1/clients', router);

router.get('/', async (req: Request, res: Response) => { 

    const { AppDataSource } = await import('../repositories/typeormRepository');
    const client = await AppDataSource.createQueryBuilder()
    .select("clients")
    .from (Client, "clients")
        .leftJoinAndSelect("clients.transactions", "transactions")
    .where("clients.id = :clientId", { clientId:  13 })
    .getMany();
    
    return res.json(client);

});

export {
    router as fetchClientsRouter
};