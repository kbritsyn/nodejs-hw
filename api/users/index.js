import { Router } from 'express';
import { userSchema } from './user.model';
import { validateSchema } from '../../middlewares/schema';
import { usersService } from './users.service';

const usersRouter = Router();

usersRouter.route('/')
    .get(usersService.getUsers)
    .post(validateSchema(userSchema), usersService.createUser);

usersRouter.route('/:id')
    .get(usersService.getUserById)
    .put(validateSchema(userSchema), usersService.updateUser)
    .delete(usersService.removeUser);

export { usersRouter };
