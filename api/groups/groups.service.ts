import { Group } from './../db/models/group';
import { GroupDTO } from './group.dto';
import { db } from '../db';

class GroupsService {
    getGroups = async () => {
        return await db.Group.findAll();
    };

    getGroupById = async (id: string) => {
        try {
            return await db.Group.findByPk(id);
        } catch (error) {
            throw error;
        }
    };

    createGroup = async (groupDTO: GroupDTO) => {
        try {
            const newGroup = await db.Group.create(groupDTO);
            return newGroup;
        } catch (error) {
            throw error;
        }
    };

    updateGroup = async (id: string, groupDTO: GroupDTO) => {
        try {
            const updatedGroup = await db.Group.update(groupDTO, {
                where: {
                    id
                }
            });
            return updatedGroup;
        } catch (error) {
            throw error;
        }
    };

    removeGroup = async (id: string) => {
        try {
            const removedGroup = await db.Group.destroy({
                where: {
                    id
                }
            });
            return removedGroup;
        } catch (error) {
            throw error;
        }
    };

    addUsersToGroup = async (group: Group, userIds: string[]) => {
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
    };
}

export const groupsService = new GroupsService();
