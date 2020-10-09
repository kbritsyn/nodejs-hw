import { Router } from 'express';
import { userSchema } from './user.validation';
import { validateSchema } from '../../middlewares/schema';
import { usersController } from './users.controller';
import { errorLogger } from '../../middlewares/error-logger';

const usersRouter = Router();

usersRouter.route('/')
    .get(errorLogger(usersController.getUsers))
    .post(validateSchema(userSchema), errorLogger(usersController.createUser));

usersRouter.route('/:id')
    .get(errorLogger(usersController.getUserById))
    .put(validateSchema(userSchema), errorLogger(usersController.updateUser))
    .delete(errorLogger(usersController.removeUser));

export { usersRouter };
