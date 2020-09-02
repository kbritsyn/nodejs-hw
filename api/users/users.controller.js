import { usersService } from './users.service';

export const usersController = {
    getUsers: (req, res) => {
        const { loginSubstring, limit } = req.query;
        const users = usersService.getUsers(loginSubstring, limit);
        res.json(users);
    },

    getUserById: (req, res) => {
        try {
            const user = usersService.getUserById(req.params.id);
            res.json(user);
        } catch (errorStatus) {
            res.status(errorStatus).json();
        }
    },

    createUser: (req, res) => {
        const newUser = usersService.createUser(req.body);
        res.json(newUser);
    },

    updateUser: (req, res) => {
        try {
            const user = usersService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (errorStatus) {
            res.status(errorStatus).json();
        }
    },

    removeUser: (req, res) => {
        try {
            const removed = usersService.removeUser(req.params.id);
            res.json(removed);
        } catch (errorStatus) {
            res.status(errorStatus).json();
        }
    }
};
