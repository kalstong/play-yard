"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Client_1 = require("../entities/Client");
const Banker_1 = require("../entities/Banker");
const Transaction_1 = require("../entities/Transaction");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Client_1.Client, Banker_1.Banker, Transaction_1.Transaction],
    synchronize: true,
    logging: false,
    // subscribers: [],
    // migrations: [],
});
//# sourceMappingURL=typeormRepository.js.map