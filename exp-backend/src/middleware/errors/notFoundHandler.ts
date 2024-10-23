import { Request, Response, NextFunction } from 'express';
import { AppError } from './appError';
import logger from '../../logs/logger';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const message = `Can't find ${req.originalUrl} on this server!`;
    logger.warn({
        message: `404 Not Found: ${req.originalUrl}`,
        method: req.method,
        ip: req.ip,
        headers: req.headers,  // Optionally log headers for debugging
        time: new Date().toISOString(),
    });
    next(new AppError(message, 404));
};
