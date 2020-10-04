import { groupsService } from './groups.service';
import { Request, Response, NextFunction } from 'express';

export const groupsController = {
    getGroups: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await groupsService.getGroups();
            res.json(users);
        } catch (error) {
            return next(error);
        }
    },

    getGroupById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const group = await groupsService.getGroupById(req.params.id);
            if (group) {
                res.json(group);
            } else {
                res.status(404).json();
            }
        } catch (error) {
            return next(error);
        }
    },

    createGroup: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newGroup = await groupsService.createGroup(req.body);
            res.json(newGroup);
        } catch (error) {
            return next(error);
        }
    },

    updateGroup: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const group = await groupsService.updateGroup(req.params.id, req.body);
            res.json(group);
        } catch (error) {
            return next(error);
        }
    },

    removeGroup: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const removed = await groupsService.removeGroup(req.params.id);
            res.json(removed);
        } catch (error) {
            return next(error);
        }
    },

    addUsersToGroup: async (req: Request, res: Response) => {
        const group = await groupsService.getGroupById(req.params.id);
        if (group) {
            await groupsService.addUsersToGroup(group, req.body);
            res.json();
        } else {
            res.status(404).json();
        }
    }
};
