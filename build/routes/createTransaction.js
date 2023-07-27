"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionRouter = void 0;
const express_1 = __importDefault(require("express"));
const Transaction_1 = require("../entities/Transaction");
const Client_1 = require("../entities/Client");
const ApiErrors_1 = require("../helper/ApiErrors");
const router = express_1.default.Router();
exports.createTransactionRouter = router;
// Configure router with a base url /api/banker
router.use('/api/v1/client', router);
router.post('/:clientId/transaction', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId } = req.params;
    const { type, amount } = req.body;
    const client = yield Client_1.Client.findOne({
        where: {
            id: parseInt(clientId)
        }
    });
    if (!client) {
        throw new ApiErrors_1.NotFoundError('Client not found');
    }
    const transaction = Transaction_1.Transaction.create({
        amount,
        type,
        client
    });
    const { AppDataSource } = yield Promise.resolve().then(() => __importStar(require('../repositories/typeormRepository')));
    yield AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionalEntityManager.save(transaction);
        if (type === Transaction_1.TransactionTypes.DEPOSIT) {
            client.balance += amount;
        }
        else if (type === Transaction_1.TransactionTypes.WITHDRAW) {
            client.balance -= amount;
        }
        yield transactionalEntityManager.save(client);
    }));
    return res.json(client);
}));
//# sourceMappingURL=createTransaction.js.map