import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.CONNECTION_STRING);
