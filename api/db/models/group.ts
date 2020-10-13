import { v4 as uuid } from 'uuid';
import { DataTypes, Optional, Model, Sequelize, HasManyAddAssociationMixin } from 'sequelize';
import { User } from './user';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface GroupAttributes {
    id?: string;
    name: string;
    permissions: Permission[];
}


interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> { }

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
    public id!: string;
    public name!: string;
    public permissions!: Permission[];

    public addUsers!: HasManyAddAssociationMixin<User[] | string[], number>;
}

export const initGroup = (sequelize: Sequelize) => {
    Group.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuid
        },
        name: {
            type: DataTypes.STRING
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    }, {
        sequelize,
        createdAt: false,
        updatedAt: false
    });
};
