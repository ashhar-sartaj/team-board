import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET;
if (!secret) {
    //if secret is undefined throe error
    throw new Error('JWT_SECRET env var is missing!');
}
export const register = async (req: any, res: any) => {
    try {
        const {name, email, password} = req.body;
        const doesUserExist = await User.findOne({email}); //returns a promise
        if (doesUserExist) {
            return res.status(400).json({message: 'user already exist'});
        }
        //else hash the received password
        const hashedPassword = await bcrypt.hash(password,10);
        //creating user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email
        })
    } catch(err) {
        return res.status(500).json({message: err});
    }
}
export const login  = async (req: any, res: any) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}); //returns a promise
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        //now issue jwt token and send it to frontend for storage
        const token = jwt.sign({id:user._id}, secret as string);

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch(err) {
        return res.status(500).json({ message: err });
    }
}