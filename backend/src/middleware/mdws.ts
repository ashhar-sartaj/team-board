import type { NextFunction } from "express";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
dotenv.config();
const secret = process.env.JWT_SECRET;
//will contain middlewares for http request and sockets
export const authenticateToken = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(403).json({message: 'Invalid token'});
    }
    jwt.verify(token, secret as string, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: 'Error in validating token' });
        // console.log(user); //{ id: '69b5ed2145b4a681705b42c7', iat: 1773530463 }
        req.user = user as any;
        console.log('token authenticate successfully')
        next();
    })
    
}