import Joi from 'joi';

export const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Password should contain at least one letter and one digit').required(),
    age: Joi.number().min(4).max(130).required()
});
