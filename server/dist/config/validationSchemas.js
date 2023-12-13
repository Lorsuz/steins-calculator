import zod from 'zod';
export const registerSchema = zod.object({
	username: zod.string(),
	password: zod.string().min(8)
});
export const loginSchema = zod.object({
	username: zod.string(),
	password: zod.string().min(6)
});
