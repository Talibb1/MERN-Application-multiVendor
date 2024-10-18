import { Request, Response, NextFunction } from 'express';
import { AppError } from './appError';
import logger from '../../logs/logger'; 
import { NODE_ENV } from '../../config/env';

// Handle Cast Errors from MongoDB
const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

// Handle Duplicate Key Errors
const handleDuplicateFieldsDB = (err: any) => {
    const value = err.keyValue[Object.keys(err.keyValue)[0]];
    const message = `Duplicate field value: "${value}". Please use another value!`;
    return new AppError(message, 400);
};

// Handle Validation Errors
const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Validation error: ${errors.join('. ')}`;
    return new AppError(message, 400);
};

export const globalErrorHandler = (
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

        // Handle specific MongoDB errors
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        // Log the error details
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
