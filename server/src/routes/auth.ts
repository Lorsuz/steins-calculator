import { Router, Request, Response } from 'express';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import { registerSchema, loginSchema } from '../middleware/validationSchemas.js';

import dotenv from 'dotenv';

import SendMail from '../services/sendMail.js';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const router: Router = Router();

/* async function comparePassword(password: string, hashedPasswordFromDatabase: string): Promise<boolean> {
	const value = await bcrypt.compare(password, hashedPasswordFromDatabase);

	return value;
} */

function generateToken(userId: number): string {
	const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecretKey';

	return jwt.sign({ userId }, SECRET_KEY);
}

router.get('/api/users', async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();

		res.json(users);
	} catch (error) {
		res.status(500).json({ error: 'An unexpected error occurred', message: 'Error fetching users' });
	}
});

router.post('/api/register', async (req: Request, res: Response) => {
	try {
		type User = {
			username: string;

			email: string;

			password: string;
		};

		// Validar e extrair dados da solicitação

		const { username, email, password }: User = registerSchema.parse(req.body);

		// Verificar se usuário ou email já existem

		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ username }, { email }]
			}
		});

		if (existingUser) {
			return res.status(400).json({ message: 'Username or email already exists' });
		}

		// Hash de senha seguro

		const passwordHashed: string = await bcrypt.hash(password, 12);

		// Criar novo usuário

		const newUser = await prisma.user.create({
			data: {
				username,

				email,

				password: passwordHashed
			}
		});

		console.log('User created:', newUser);

		await SendMail(newUser.email);

		res.json({ message: 'Registration successful' });
	} catch (error) {
		console.error('Error during registration:', error);

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			res.status(400).json({ error: error.message, message: 'Registration unsuccessful' });
		} else {
			res.status(500).json({ error: 'An unexpected error occurred', message: 'Registration unsuccessful' });
		}
	}
});

router.post('/api/login', async (req: Request, res: Response) => {
	try {
		const { username, password } = loginSchema.parse(req.body);

		const user = await prisma.user.findFirst({
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

		const compareHash = await bcrypt.compare(password, user.password);

		if (!compareHash) {
			res.status(401).json({ message: 'Invalid password' });

			return;
		}

		const token = generateToken(user.id);

		res.json({ message: 'Login successful', token });
	} catch (error) {
		console.error('Error during login:', error);

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			res.status(400).json({ error: error.message, message: 'Login unsuccessful' });
		} else {
			res.status(500).json({ error: 'An unexpected error occurred during login', message: 'Login unsuccessful' });
		}
	}
});

export default router;
