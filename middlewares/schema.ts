import { Schema } from "joi";
import { Request, Response, NextFunction } from 'express';

export const validateSchema = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false
    });
    if (error) {
        res.status(400).json(error.details);
    } else {
        // eslint-disable-next-line callback-return
        next();
    }
};
