import { createLogger, format, transports } from 'winston';
import path from 'path';
const logFilePath = path.join(__dirname, '../logs/error.log');

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} ${level}: ${message} ${stack ? `\n${stack}` : ''}`;
        })
    ),
    transports: [
        new transports.File({ filename: logFilePath, level: 'error' }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        }),
    ],
});

export default logger;
