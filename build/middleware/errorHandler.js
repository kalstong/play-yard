"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const typeorm_1 = require("typeorm");
/*
    This is an error handling middleware function for an Express application.
    
    It takes four parameters: err, req, res, and next.
    The err parameter is the error object that was thrown by a previous middleware or route handler.
    The req parameter is the request object, the res parameter is the response object,
        and the next parameter is the next middleware function in the chain.

    The function first checks if the err object has a statusCode property.
    If it does, it sets the statusCode variable to the value of err.statusCode.
    If it doesn't, it sets the statusCode variable to 500, which is the default HTTP status code
        for internal server errors.

    The function then sets the message variable based on the type of error.
    If the err object has a statusCode property,
        it sets the message variable to the value of err.message.
    If the err object is an instance of QueryFailedError,
        which is an error thrown by the TypeORM library when a database query fails,
        it sets the message variable to the detail property of the driverError property
        of the err object.
    If the err object is any other type of error, it sets the message variable
        to the string 'Internal Server Error'.

    The function sends a response to the client with the statusCode and message variables.
*/
const errorHandler = (err, _req, res, next) => {
    var _a, _b;
    const statusCode = (_a = err.statusCode) !== null && _a !== void 0 ? _a : 500;
    let message = '';
    if (err.statusCode) {
        message = err.message;
    }
    else {
        message = err instanceof typeorm_1.QueryFailedError ?
            (_b = err === null || err === void 0 ? void 0 : err.driverError) === null || _b === void 0 ? void 0 : _b.detail :
            'Internal Server Error';
    }
    res.status(statusCode).send({ message });
    next(err);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map