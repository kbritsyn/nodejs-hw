import { createLogger, format, transports } from 'winston';

export const initLogger = () => {
    const logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        transports: [
            new transports.File({ filename: 'logs/error.log', level: 'error' }),
            new transports.File({ filename: 'logs/combined.log' })
        ],
        exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })]
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }));
    }

    return logger;
};
