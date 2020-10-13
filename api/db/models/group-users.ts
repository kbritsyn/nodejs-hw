import { Group } from './group';
import { User } from './user';

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

