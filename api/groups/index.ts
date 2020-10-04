import { Router } from 'express';
import { groupsController } from './groups.controller';
import { errorLogger } from '../../middlewares/error-logger';

const groupsRouter = Router();

groupsRouter.route('/')
    .get(errorLogger(groupsController.getGroups))
    .post(groupsController.createGroup);

groupsRouter.route('/:id')
    .get(groupsController.getGroupById)
    .put(groupsController.updateGroup)
    .delete(groupsController.removeGroup);

groupsRouter.get('/:id/add-users', errorLogger(groupsController.addUsersToGroup));

export { groupsRouter };
