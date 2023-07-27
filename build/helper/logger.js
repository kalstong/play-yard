"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.apiErrorLogger = exports.apiLogger = void 0;
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
    format: format.combine(format.json(), format.timestamp(), format.prettyPrint()),
});
exports.logger = logger;
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
    format: format.combine(format.json(), format.timestamp(), format.prettyPrint()),
});
exports.apiLogger = apiLogger;
const logFormat = format.printf(({ level, meta, timestamp }) => {
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
    format: format.combine(format.json(), format.timestamp(), logFormat)
});
exports.apiErrorLogger = apiErrorLogger;
//# sourceMappingURL=logger.js.map