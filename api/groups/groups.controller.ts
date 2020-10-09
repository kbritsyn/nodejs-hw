import { groupsService } from './groups.service';
import { Request, Response } from 'express';

export const groupsController = {
    getGroups: async (req: Request, res: Response) => {
        const users = await groupsService.getGroups();
        res.json(users);
    },

    getGroupById: async (req: Request, res: Response) => {
        const group = await groupsService.getGroupById(req.params.id);
        if (group) {
            res.json(group);
        } else {
            res.status(404).json();
        }
    },

    createGroup: async (req: Request, res: Response) => {
        const newGroup = await groupsService.createGroup(req.body);
        res.json(newGroup);
    },

    updateGroup: async (req: Request, res: Response) => {
        const group = await groupsService.getGroupById(req.params.id);
        if (group) {
            const result = await groupsService.updateGroup(group, req.body);
            res.json(result);
        } else {
            res.status(404).json();
        }
    },

    removeGroup: async (req: Request, res: Response) => {
        const group = await groupsService.getGroupById(req.params.id);
        if (group) {
            const result = await groupsService.removeGroup(group);
            res.json(result);
        } else {
            res.status(404).json();
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
