import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import logger from '../utils/logger';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const message = `Can't find ${req.originalUrl} on this server!`;
    logger.warn({
        message: `404 Not Found: ${req.originalUrl}`,
        method: req.method,
        ip: req.ip,
        time: new Date().toISOString(),
    });
    next(new AppError(message, 404));
};
