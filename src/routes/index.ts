import express from 'express';
import { createClientRouter } from './createClient';
import { createBankerRouter } from './createBanker';
import { createTransactionRouter } from './createTransaction';
import { connectBankerToClientRouter } from './connectBankerToClient';
import { deleteClientRouter } from './deleteClient';  
import { fetchClientsRouter } from './fetchClients';

const router = express.Router();

router.use(createClientRouter);
router.use(createBankerRouter);
router.use(createTransactionRouter);
router.use(connectBankerToClientRouter);
router.use(deleteClientRouter);
router.use(fetchClientsRouter);

export {
    router as routes
};