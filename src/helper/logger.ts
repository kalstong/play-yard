const { createLogger, format, transports } = require('winston');

/*
    * This logger is used to log all operational events in the API server.
*/
const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'info',
            filename: 'logs/operational.log'
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
});

/*
    * This logger is used to log all requests to the API server.
*/
const apiLogger = createLogger({
    transports: [
        // new transports.Console(),
        new transports.File({
            level: 'info',
            filename: 'logs/api-requests.log'
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
});

const logFormat = format.printf(({ level, meta, timestamp }:
    { level: string, meta: any, timestamp: string }) => {
    return `${timestamp} ${level}: ${meta.message}`;
});

/*
    * This logger is used to log errors that occur in the API server.
*/
const apiErrorLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'logs/internalErrors.log'
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        logFormat
    )
});

export {
    apiLogger,
    apiErrorLogger,
    logger
} 