"use strict";
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
exports.connectBankerToClientRouter = void 0;
const express_1 = __importDefault(require("express"));
const Client_1 = require("../entities/Client");
const Banker_1 = require("../entities/Banker");
const router = express_1.default.Router();
exports.connectBankerToClientRouter = router;
// Configure router with a base url /api/banker
router.use('/api/v1/banker', router);
router.post('/:bankerId/client/:clientId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bankerId, clientId } = req.params;
    const client = yield Client_1.Client.findOne({ where: { id: parseInt(clientId) } });
    const banker = yield Banker_1.Banker.findOne({ where: { id: parseInt(bankerId) } });
    if (!client || !banker) {
        return res.status(400).json({
            msg: "Client or Banker not found"
        });
    }
    banker.clients = [client];
    yield banker.save();
    return res.json(banker);
}));
//# sourceMappingURL=connectBankerToClient.js.map