import { UserDTO } from './user.dto';
import { Op } from 'sequelize';
import { db } from '../db';
import { User } from '../db/models/user';

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

    updateUser: async (user: User, userDTO: UserDTO) => {
        try {
            (Object.keys(userDTO) as Array<keyof UserDTO>).forEach(key => {
                (user as any)[key] = userDTO[key];
            })
            const updatedUser = await user.save();
            return updatedUser;
        } catch (error) {
            throw error;
        }
    },

    removeUser: async (user: User) => {
        try {
            user.isDeleted = true;
            const removedUser = await user.save();
            return removedUser;
        } catch (error) {
            throw error;
        }
    }
};
