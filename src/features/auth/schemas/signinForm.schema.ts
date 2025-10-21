import z from 'zod';

export const signinForm = z.object({
	matricula: z.string(),
	senha: z.string(),
});

export type SigninFormType = z.infer<typeof signinForm>;
