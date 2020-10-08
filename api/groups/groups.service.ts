import { Group } from './../db/models/group';
import { GroupDTO } from './group.dto';
import { db } from '../db';

export const groupsService = {
    getGroups: async () => {
        return await db.Group.findAll();
    },

    getGroupById: async (id: string) => {
        try {
            return await db.Group.findByPk(id);
        } catch (error) {
            throw error;
        }
    },

    createGroup: async (groupDTO: GroupDTO) => {
        try {
            const newGroup = await db.Group.create(groupDTO);
            return newGroup;
        } catch (error) {
            throw error;
        }
    },

    updateGroup: async (group: Group, groupDTO: GroupDTO) => {
        try {
            (Object.keys(groupDTO) as Array<keyof GroupDTO>).forEach(key => {
                group[key] = groupDTO[key] as any;
            })
            const updatedGroup = await group.save();
            return updatedGroup;
        } catch (error) {
            throw error;
        }
    },

    removeGroup: async (group: Group) => {
        try {
            await group.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    },

    addUsersToGroup: async (group: Group, userIds: string[]) => {
        const transaction = await db.sequelize.transaction();
        try {
            await Promise.all(
                userIds.map(userId => {
                    return db.GroupUsers.create({
                        userId,
                        groupId: group.id
                    }, { transaction });
                })
            );
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
        // const res = await db.GroupUsers.bulkCreate(userIds.map(userId => ({
        //     userId,
        //     groupId: group.id
        // })));
        // return res;
    }
};
