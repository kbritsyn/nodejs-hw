import { User } from './user.model';

const users = [];

export const usersService = {
    getUsers: (loginSubstring, limit) => {
        if (loginSubstring && limit) {
            return users
                .filter(user => user.login?.includes(loginSubstring))
                .slice()
                .sort((a, b) => a.login?.localeCompare(b.login))
                .slice(0, +limit);
        }
        return users;
    },

    getUserById: (id) => {
        const user = users.find(usr => usr.id === id);
        if (!user) {
            throw 404;
        }
        return user;
    },

    createUser: (userDTO) => {
        const newUser = new User(userDTO);
        users.push(newUser);
        return newUser;
    },

    updateUser: (id, userDTO) => {
        const userIdx = users.findIndex(user => user.id === id);
        if (userIdx === -1) {
            throw 404;
        }
        users[userIdx] = { ...users[userIdx], ...userDTO };
        return users[userIdx];
    },

    removeUser: (id) => {
        const user = users.find(usr => usr.id === id);
        if (!user) {
            throw 404;
        }
        user.isDeleted = true;
        return true;
    }
};
