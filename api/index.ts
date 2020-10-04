import { Router } from 'express';
import { usersRouter } from './users';
import { groupsRouter } from './groups';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/groups', groupsRouter);

export { apiRouter };
