"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const createClient_1 = require("./createClient");
const createBanker_1 = require("./createBanker");
const createTransaction_1 = require("./createTransaction");
const connectBankerToClient_1 = require("./connectBankerToClient");
const deleteClient_1 = require("./deleteClient");
const fetchClients_1 = require("./fetchClients");
const router = express_1.default.Router();
exports.routes = router;
router.use(createClient_1.createClientRouter);
router.use(createBanker_1.createBankerRouter);
router.use(createTransaction_1.createTransactionRouter);
router.use(connectBankerToClient_1.connectBankerToClientRouter);
router.use(deleteClient_1.deleteClientRouter);
router.use(fetchClients_1.fetchClientsRouter);
//# sourceMappingURL=index.js.map