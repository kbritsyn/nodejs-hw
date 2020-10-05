import { Sequelize } from 'sequelize';
import { initUser, User } from './models/user';
import { initGroup, Group } from './models/group';
import { associateGroupUsers, initGroupUsers, GroupUsers } from './models/group-users';

const sequelize = new Sequelize(process.env.CONNECTION_STRING as string);

initUser(sequelize);
initGroup(sequelize);
initGroupUsers(sequelize);
associateGroupUsers();

sequelize.sync();

const db = {
    sequelize,
    User,
    Group,
    GroupUsers
};

export { db };
