import { usersService } from './users.service';
import { Request, Response } from 'express';

export const usersController = {
    getUsers: async (req: Request, res: Response) => {
        const { loginSubstring, limit } = req.query as { loginSubstring: string, limit: string };
        try {
            const users = await usersService.getUsers(loginSubstring, +limit);
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const user = await usersService.getUserById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json();
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            const newUser = await usersService.createUser(req.body);
            res.json(newUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const user = await usersService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json();
        }
    },

    removeUser: async (req: Request, res: Response) => {
        try {
            const removed = await usersService.removeUser(req.params.id);
            res.json(removed);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
