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
exports.createClientRouter = void 0;
const express_1 = __importDefault(require("express"));
const Client_1 = require("../entities/Client");
const router = express_1.default.Router();
exports.createClientRouter = router;
// Configure router with a base url /api/client
router.use('/api/v1/client', router);
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, middleName, lastName, email, cardNumber, balance } = req.body;
    // Sanitize input
    const sanitizedEmail = email.replace(/<[^>]*>/g, '');
    const client = Client_1.Client.create({
        firstName,
        middleName,
        lastName,
        email: sanitizedEmail,
        cardNumber,
        balance
    });
    yield client.save();
    return res.json(client);
}));
//# sourceMappingURL=createClient.js.map