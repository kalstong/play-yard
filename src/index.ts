import * as dotenv from 'dotenv';
import 'express-async-errors';
import "reflect-metadata"   
import express, { Express } from 'express';
import helnet from 'helmet';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import { routes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { apiLogger, apiErrorLogger, logger } from './helper/logger';

dotenv.config();

const app: Express = express();
app.use(helnet());
app.use(cookieParser());
const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Use middleware to handle common tasks
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressWinston.logger({
    winstonInstance: apiLogger,
    statusLevels: true,
}));

// Add routes
app.use(routes);

// Use middleware to handle errors
app.use(errorHandler);

app.use(expressWinston.errorLogger({
    winstonInstance: apiErrorLogger,
}));

const port: string = process.env.PORT || '3000';

const main = async () => {
    try {   
        const { AppDataSource } = await import('./repositories/typeormRepository');
        await AppDataSource.initialize()

        logger.info('Database connected');
    } catch (error) {
        logger.error('Database connection failed', error);
    }

    try {
        app.listen(port, () => {
            logger.info(`Server running on port ${port}`);
        });

        logger.info('Server started');
    } catch (error) {
        logger.error('Server failed to start', error);
    }
};

main();
