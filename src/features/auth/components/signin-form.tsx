'use client';

import { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signinForm } from '../schemas/signinForm.schema';
import { SigninFormType } from '../schemas/signinForm.schema';
import { signIn } from '../services/authService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useApiCall from '@/features/core/hooks/useApiCall';
import { LoaderCircle } from 'lucide-react';
import { useUserStore } from '@/features/core/store/user';
import { Role } from '@/features/core/constants/roles';

export function SignInForm({
	className,
	...props
}: ComponentProps<'div'> & { redirectUrl?: string }) {
	const { action, isLoading } = useApiCall(signIn);
	const { setUser } = useUserStore();
	const form = useForm<SigninFormType>({
		resolver: zodResolver(signinForm),
		defaultValues: {
			matricula: '',
			senha: '',
		},
	});
	const router = useRouter();

	async function handleSignin(values: SigninFormType) {
		try {
			const data = await action(values);
			setUser({ name: data.name as string, role: data.role as Role });

			router.push('/app/dashboard');
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			toast.error(
				'Houve um erro ao realizar o login, verifique as credenciais e tente novamente. Caso o problema persista entre em contato com o suporte.'
			);
		}
	}

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
					onSubmit={form.handleSubmit(handleSignin)}
				>
					<FormField
						control={form.control}
						name='matricula'
						render={({ field }) => (
							<Input
								placeholder='Matricula'
								className='rounded-none text-base placeholder:text-[#9f9f9f]'
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
								className='rounded-none text-base placeholder:text-[#9f9f9f]'
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
						{isLoading ? (
							<>
								<LoaderCircle className='animate-spin' />
								Carregando
							</>
						) : (
							<>Login</>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
