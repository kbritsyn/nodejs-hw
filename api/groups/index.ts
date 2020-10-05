import { Router } from 'express';
import { groupsController } from './groups.controller';

const groupsRouter = Router();

groupsRouter.route('/')
    .get(groupsController.getGroups)
    .post(groupsController.createGroup);

groupsRouter.route('/:id')
    .get(groupsController.getGroupById)
    .put(groupsController.updateGroup)
    .delete(groupsController.removeGroup);

groupsRouter.get('/:id/add-users', groupsController.addUsersToGroup);

export { groupsRouter };
