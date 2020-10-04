import { Group } from './group';
import { User } from './user';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

interface GroupUsersAttributes {
    id?: number;
    groupId: string;
    userId: string;
}


interface GroupUsersCreationAttributes extends Optional<GroupUsersAttributes, 'id'> { }

export class GroupUsers extends Model<GroupUsersAttributes, GroupUsersCreationAttributes> implements GroupUsersAttributes {
    public id!: number;
    public userId!: string;
    public groupId!: string;
}

export const initGroupUsers = (sequelize: Sequelize) => {
    GroupUsers.init({
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        groupId: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    }, {
        sequelize,
        createdAt: false,
        updatedAt: false
    });
};

export const associateGroupUsers = () => {
    User.belongsToMany(Group, {
        through: 'GroupUsers',
        foreignKey: 'userId',
        foreignKeyConstraint: true
    });
    Group.belongsToMany(User, {
        through: 'GroupUsers',
        foreignKey: 'groupId',
        foreignKeyConstraint: true
    });
};

