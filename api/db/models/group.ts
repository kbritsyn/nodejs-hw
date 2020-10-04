import { v4 as uuid } from 'uuid';
import { DataTypes, Optional, Model, Sequelize } from 'sequelize';

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
}

export const initGroup = (sequelize: Sequelize) => {
    Group.init({
        id: {
            type: DataTypes.STRING,
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
