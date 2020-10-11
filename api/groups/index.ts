import { Router } from 'express';
import { groupsController } from './groups.controller';
import { errorLogger } from '../shared/error-logger';
import { authenticate } from '../shared/authentication';

const groupsRouter = Router();

groupsRouter.route('/')
    .get(authenticate, errorLogger(groupsController.getGroups))
    .post(authenticate, errorLogger(groupsController.createGroup));

groupsRouter.route('/:id')
    .get(authenticate, errorLogger(groupsController.getGroupById))
    .put(authenticate, errorLogger(groupsController.updateGroup))
    .delete(authenticate, errorLogger(groupsController.removeGroup));

groupsRouter.get('/:id/add-users', authenticate, errorLogger(groupsController.addUsersToGroup));

export { groupsRouter };
