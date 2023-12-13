var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../middleware/validationSchemas.js';
import dotenv from 'dotenv';
import SendMail from '../services/sendMail.js';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
dotenv.config();
const router = Router();
function generateToken(userId) {
    const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecretKey';
    return jwt.sign({ userId }, SECRET_KEY);
}
router.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred', message: 'Error fetching users' });
    }
}));
router.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = registerSchema.parse(req.body);
        const existingUser = yield prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }]
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const passwordHashed = yield bcrypt.hash(password, 12);
        const newUser = yield prisma.user.create({
            data: {
                username,
                email,
                password: passwordHashed
            }
        });
        console.log('User created:', newUser);
        yield SendMail(newUser.email);
        res.json({ message: 'Registration successful' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message, message: 'Registration unsuccessful' });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred', message: 'Registration unsuccessful' });
        }
    }
}));
router.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = loginSchema.parse(req.body);
        const user = yield prisma.user.findFirst({
            where: {
                username
            }
        });
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }
        if (!user.password) {
            res.status(401).json({ message: 'User has no password' });
            return;
        }
        const compareHash = yield bcrypt.compare(password, user.password);
        if (!compareHash) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        const token = generateToken(user.id);
        res.json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error('Error during login:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message, message: 'Login unsuccessful' });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred during login', message: 'Login unsuccessful' });
        }
    }
}));
export default router;
