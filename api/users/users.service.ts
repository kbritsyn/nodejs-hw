import { User, UserDTO } from './user.model';
import { Op } from 'sequelize';

export const usersService = {
    getUsers: async (loginSubstring: string, limit: number) => {
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

    getUserById: async (id: string) => {
        try {
            return await User.findByPk(id);
        } catch (error) {
            throw error;
        }
    },

    createUser: async (userDTO: UserDTO) => {
        try {
            const newUser = await User.create(userDTO);
            return newUser;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (id: string, userDTO: UserDTO) => {
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

    removeUser: async (id: string) => {
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
