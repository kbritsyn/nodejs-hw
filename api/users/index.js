import { Router } from 'express';
import { userSchema } from './user.validation';
import { validateSchema } from '../../middlewares/schema';
import { usersController } from './users.controller';

const usersRouter = Router();

usersRouter.route('/')
    .get(usersController.getUsers)
    .post(validateSchema(userSchema), usersController.createUser);

usersRouter.route('/:id')
    .get(usersController.getUserById)
    .put(validateSchema(userSchema), usersController.updateUser)
    .delete(usersController.removeUser);

export { usersRouter };
