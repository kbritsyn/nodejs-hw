import { User } from './user.model';

const users = [];

export const usersService = {
    getUsers: (req, res) => {
        const { loginSubstring, limit } = req.query;
        if (loginSubstring && limit) {
            res.json(users
                .filter(user => user.login?.includes(loginSubstring))
                .slice()
                .sort((a, b) => a.login?.localeCompare(b.login))
                .slice(0, +limit)
            );
        } else {
            res.json(users);
        }
    },

    getUserById: (req, res) => {
        const user = users.find(usr => usr.id === req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json();
        }
    },

    createUser: (req, res) => {
        const newUser = new User(req.body);
        users.push(newUser);
        res.json(newUser);
    },

    updateUser: (req, res) => {
        const userIdx = users.findIndex(user => user.id === req.params.id);
        if (userIdx !== -1) {
            users[userIdx] = { ...users[userIdx], ...req.body };
            res.json(users[userIdx]);
        } else {
            res.status(404).json();
        }
    },

    removeUser: (req, res) => {
        const user = users.find(usr => usr.id === req.params.id);
        if (user) {
            user.isDeleted = true;
            res.json(true);
        } else {
            res.status(404).json();
        }
    }
};
