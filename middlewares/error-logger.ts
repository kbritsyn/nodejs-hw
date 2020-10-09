import { Request, Response, NextFunction } from 'express';
import { logger } from '..';

export const errorLogger = (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        logger.error(`Exception in ${controller.name}: ${req.method} ${req.url} ${req.body}`);
        return next(error);
    }
};
