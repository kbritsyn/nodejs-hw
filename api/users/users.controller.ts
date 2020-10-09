import { usersService } from './users.service';
import { Request, Response } from 'express';

export const usersController = {
    getUsers: async (req: Request, res: Response) => {
        const { loginSubstring, limit } = req.query as { loginSubstring: string, limit: string };
        const users = await usersService.getUsers(loginSubstring, +limit);
        res.json(users);
    },

    getUserById: async (req: Request, res: Response) => {
        const user = await usersService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json();
        }
    },

    createUser: async (req: Request, res: Response) => {
        const newUser = await usersService.createUser(req.body);
        res.json(newUser);
    },

    updateUser: async (req: Request, res: Response) => {
        const user = await usersService.getUserById(req.params.id);
        if (user) {
            const updated = await usersService.updateUser(user, req.body);
            res.json(updated);
        } else {
            res.status(404).json();
        }
    },

    removeUser: async (req: Request, res: Response) => {
        const user = await usersService.getUserById(req.params.id);
        if (user) {
            const removed = await usersService.removeUser(user);
            res.json(removed);
        } else {
            res.status(404).json();
        }
    }
};
