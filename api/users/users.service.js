import { User } from './user.model';
import { Op } from 'sequelize';

export const usersService = {
    getUsers: async (loginSubstring, limit) => {
        if (loginSubstring && limit) {
            return await User.findAll({
                where: {
                    login: {
                        [Op.like]: `${loginSubstring}%`
                    }
                },
                order: [['login', 'ASC']],
                limit
            });
        }
        return await User.findAll();
    },

    getUserById: async (id) => {
        try {
            return await User.findByPk(id);
        } catch (error) {
            throw error;
        }
    },

    createUser: async (userDTO) => {
        try {
            const newUser = await User.create(userDTO);
            return newUser;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (id, userDTO) => {
        try {
            const updatedUser = await User.update(userDTO, {
                where: {
                    id
                }
            });
            return updatedUser;
        } catch (error) {
            throw error;
        }
    },

    removeUser: async (id) => {
        try {
            const updatedUser = await User.update({ isDeleted: true }, {
                where: {
                    id
                }
            });
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
};
