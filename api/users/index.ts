import { Router } from 'express';
import { userSchema } from './user.validation';
import { validateSchema } from '../shared/schema';
import { usersController } from './users.controller';
import { errorLogger } from '../shared/error-logger';
import { authenticate } from '../shared/authentication';

const usersRouter = Router();

usersRouter.route('/')
    .get(authenticate, errorLogger(usersController.getUsers))
    .post(validateSchema(userSchema), errorLogger(usersController.createUser));

usersRouter.route('/:id')
    .get(authenticate, errorLogger(usersController.getUserById))
    .put(authenticate, validateSchema(userSchema), errorLogger(usersController.updateUser))
    .delete(authenticate, errorLogger(usersController.removeUser));

export { usersRouter };
