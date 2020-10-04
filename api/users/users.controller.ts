import { usersService } from './users.service';
import { Request, Response, NextFunction } from 'express';

export const usersController = {
    getUsers: async (req: Request, res: Response, next: NextFunction) => {
        const { loginSubstring, limit } = req.query as { loginSubstring: string, limit: string };
        try {
            const users = await usersService.getUsers(loginSubstring, +limit);
            res.json(users);
        } catch (error) {
            return next(error);
        }
    },

    getUserById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await usersService.getUserById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json();
            }
        } catch (error) {
            return next(error);
        }
    },

    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = await usersService.createUser(req.body);
            res.json(newUser);
        } catch (error) {
            return next(error);
        }
    },

    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await usersService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            return next(error);
        }
    },

    removeUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const removed = await usersService.removeUser(req.params.id);
            res.json(removed);
        } catch (error) {
            return next(error);
        }
    }
};
