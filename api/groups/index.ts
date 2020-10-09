import { Router } from 'express';
import { groupsController } from './groups.controller';
import { errorLogger } from '../../middlewares/error-logger';

const groupsRouter = Router();

groupsRouter.route('/')
    .get(errorLogger(groupsController.getGroups))
    .post(errorLogger(groupsController.createGroup));

groupsRouter.route('/:id')
    .get(errorLogger(groupsController.getGroupById))
    .put(errorLogger(groupsController.updateGroup))
    .delete(errorLogger(groupsController.removeGroup));

groupsRouter.get('/:id/add-users', errorLogger(groupsController.addUsersToGroup));

export { groupsRouter };
