import { v4 as uuid } from 'uuid';
import { DataTypes, Optional, Model, Sequelize } from 'sequelize';

interface UserAttributes {
    id?: string;
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
}


interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean;
}

export const initUser = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuid
        },
        login: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        createdAt: false,
        updatedAt: false
    });
};
