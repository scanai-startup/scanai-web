'use client';

import { ComponentProps, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signinForm } from '../schemas/signinForm.schema';
import { SigninFormType } from '../schemas/signinForm.schema';
import { AuthService } from '../services/auth-service';
import { toast } from 'sonner';

export function SignInForm({
	className,
	redirectUrl = '/dashboard',
	...props
}: ComponentProps<'div'> & { redirectUrl?: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<SigninFormType>({
		resolver: zodResolver(signinForm),
		defaultValues: {
			matricula: '',
			senha: '',
		},
	});
	const router = useRouter();

	const onSubmit = async (data: SigninFormType) => {
		try {
			setIsLoading(true);

			const token = await AuthService.login(data.matricula, data.senha);
			AuthService.saveToken(token);

			toast.success('Login realizado com sucesso!');
			router.push(redirectUrl);
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Erro ao fazer login'
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={cn(
				'z-10 flex w-full max-w-sm flex-col items-center gap-6',
				className
			)}
			{...props}
		>
			<Form {...form}>
				<form
					className='flex min-w-sm flex-col gap-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name='matricula'
						render={({ field }) => (
							<Input
								type='text'
								placeholder='Matrícula'
								className='rounded-none !bg-[#1D1D1D]/100 text-base placeholder:text-[#9f9f9f]'
								disabled={isLoading}
								{...field}
							/>
						)}
					/>

					<FormField
						control={form.control}
						name='senha'
						render={({ field }) => (
							<Input
								type='password'
								placeholder='Senha'
								className='rounded-none !bg-[#1D1D1D]/100 text-base placeholder:text-[#9f9f9f]'
								disabled={isLoading}
								{...field}
							/>
						)}
					/>

					<Button
						type='submit'
						className='rounded-none text-base cursor-pointer'
						disabled={isLoading}
					>
						{isLoading ? 'Entrando...' : 'Login'}
					</Button>
				</form>
			</Form>
		</div>
	);
}
