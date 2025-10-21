'use server';

import { apiService } from '@/features/core/services/apiService';
import { SigninFormType } from '../schemas/signinForm.schema';
import { cookies } from 'next/headers';
import SigninResponse from '../types/signinResponse';

export const signIn = async (payload: SigninFormType) => {
	try {
		const data = await apiService<SigninResponse>('/auth/login', {
			method: 'POST',
			body: payload,
		});

		const cookieStore = await cookies();

		cookieStore.set('token', data.token, {
			path: '/',
			// maxAge: 60 * 60,
			secure: false,
			httpOnly: true,
		});
	} catch (error) {
		console.error('Erro ao realizar login: ', error);
		throw error;
	}
};
