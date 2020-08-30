import { v4 as uuid } from 'uuid';
import Joi from 'joi';

export class User {
    constructor(user) {
        this.login = user.login;
        this.password = user.password;
        this.age = user.age;
        this.id = uuid();
        this.isDeleted = false;
    }
}

export const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().min(4).max(130).required()
});
