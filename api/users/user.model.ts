import { v4 as uuid } from 'uuid';
import { sequelize } from '../../sequelize';
import { DataTypes } from 'sequelize';

export interface UserDTO {
    login: string;
    password: string;
    age: number;
}

export const User = sequelize.define('User', {
    login: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.NUMBER
    },
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: uuid
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { createdAt: false, updatedAt: false });
