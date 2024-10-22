import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log file path
const logFilePath = path.join(__dirname, '../logs/%DATE%.error.log');

const transport = new DailyRotateFile({
    filename: logFilePath,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // Old logs will be zipped
    maxSize: '200m', // Maximum size of a log file
    maxFiles: '7d', // Keep logs for 7 days
    level: 'error'
});

// Logger configuration
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
        transport, // DailyRotateFile transport
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        }),
    ],
});

export default logger;
