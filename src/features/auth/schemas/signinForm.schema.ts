import z from 'zod';

export const signinForm = z.object({
	email: z.email(),
	password: z.string().min(8),
});

export type SigninFormType = z.infer<typeof signinForm>;
