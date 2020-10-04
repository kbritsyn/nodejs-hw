import { UserDTO } from './user.dto';
import { Op } from 'sequelize';
import { db } from '../db';

export const usersService = {
    getUsers: async (loginSubstring: string, limit: number) => {
        if (loginSubstring && limit) {
            return await db.User.findAll({
                where: {
                    login: {
                        [Op.like]: `${loginSubstring}%`
                    }
                },
                order: [['login', 'ASC']],
                limit
            });
        }
        return [];
    },

    getUserById: async (id: string) => {
        try {
            return await db.User.findByPk(id);
        } catch (error) {
            throw error;
        }
    },

    createUser: async (userDTO: UserDTO) => {
        try {
            const newUser = await db.User.create(userDTO);
            return newUser;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (id: string, userDTO: UserDTO) => {
        try {
            const updatedUser = await db.User.update(userDTO, {
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
            const updatedUser = await db.User.update({ isDeleted: true }, {
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
