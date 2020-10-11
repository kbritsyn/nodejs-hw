import { NextFunction, Request, Response } from 'express';
import { db } from '../db';
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET;

export const authenticationHandler = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const user = await db.User.findOne({
        where: {
            login: userName
        }
    });
    if (user && user.password === password) {
        const payload = {
            userName: user.login,
            isDeleted: user.isDeleted
        };
        
        if (!secret) {
            throw new Error('JWT_SECRET env variable not set');
        }
        const token = jwt.sign(payload, secret, { expiresIn: '1m'});
        res.json(token);
    } else {
        res.status(401).json('Wrong user name/password');
    }
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(':')?.[1]?.trim();
    console.log(req.headers.authorization, token);
    if (!secret) {
        throw new Error('JWT_SECRET env variable not set');
    }
    if (token) {
        jwt.verify(token, secret, error => {
            if (error) {
                return res.status(403).json();
            }
            return next();
        })
    } else {
        res.status(401).json();
    }

}