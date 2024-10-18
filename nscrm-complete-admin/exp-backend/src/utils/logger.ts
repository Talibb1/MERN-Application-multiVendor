import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), // Custom timestamp format
        format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} ${level}: ${message} ${stack ? `\n${stack}` : ''}`;
        })
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        }),
    ],
});

export default logger;
