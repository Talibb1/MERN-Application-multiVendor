import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import logger from '../utils/logger'; 
import { NODE_ENV } from '../constants';

const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

// Add more specific error handlers as needed (like MongoDB, JWT errors, etc.)

const globalErrorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;
        if (error.name === 'CastError') error = handleCastErrorDB(error);

        // Log the error details (use a logging tool like Winston)
        logger.error({
            message: error.message,
            stack: error.stack,
            statusCode: error.statusCode,
        });

        // Operational errors: trusted errors that can be shown to clients
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } else {
            // Programming or other unknown errors: don’t leak details to clients
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong.',
            });
        }
    } else {
        // Development error handling: show full details
        console.error('ERROR 💥:', err);
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack, // Detailed error stack for debugging
        });
    }
};

export default globalErrorHandler;
