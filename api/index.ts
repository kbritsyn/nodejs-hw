import { Router } from 'express';
import { usersRouter } from './users';
import { groupsRouter } from './groups';
import { Response } from 'express';
import { logger } from '..';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/groups', groupsRouter);

// eslint-disable-next-line no-unused-vars
apiRouter.use((err: any, _: any, res: Response, __: any) => {
    logger.error(err);
    res.status(500).json({
        message: err
    });
});

export { apiRouter };
