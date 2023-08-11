import { DataSource } from 'typeorm';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';
import { Transaction } from '../entities/Transaction';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as number | undefined || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [ Client, Banker, Transaction ],
    synchronize: true,
    logging: false,
    // subscribers: [],
    // migrations: [],
});