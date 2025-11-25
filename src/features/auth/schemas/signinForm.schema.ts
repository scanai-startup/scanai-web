import z from 'zod';

export const signinForm = z.object({
	matricula: z.string().min(1, 'Matrícula é obrigatória'),
	senha: z.string().min(1, 'Senha é obrigatória'),
});

export type SigninFormType = z.infer<typeof signinForm>;
