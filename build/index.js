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
const dotenv = __importStar(require("dotenv"));
require("express-async-errors");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_winston_1 = __importDefault(require("express-winston"));
const routes_1 = require("./routes");
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./helper/logger");
dotenv.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
// Use middleware to handle common tasks
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_winston_1.default.logger({
    winstonInstance: logger_1.apiLogger,
    statusLevels: true,
}));
// Add routes
app.use(routes_1.routes);
// Use middleware to handle errors
app.use(errorHandler_1.errorHandler);
app.use(express_winston_1.default.errorLogger({
    winstonInstance: logger_1.apiErrorLogger,
}));
const port = process.env.PORT || '3000';
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { AppDataSource } = yield Promise.resolve().then(() => __importStar(require('./repositories/typeormRepository')));
        yield AppDataSource.initialize();
        logger_1.logger.info('Database connected');
    }
    catch (error) {
        logger_1.logger.error('Database connection failed', error);
    }
    try {
        app.listen(port, () => {
            logger_1.logger.info(`Server running on port ${port}`);
        });
        logger_1.logger.info('Server started');
    }
    catch (error) {
        logger_1.logger.error('Server failed to start', error);
    }
});
main();
//# sourceMappingURL=index.js.map