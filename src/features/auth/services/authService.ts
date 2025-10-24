'use server';

import { apiService } from '@/features/core/services/apiService';
import { SigninFormType } from '../schemas/signinForm.schema';
import { cookies } from 'next/headers';
import SigninResponse from '../types/signinResponse';
import { jwtDecode } from 'jwt-decode';
import { encrypt } from '@/lib/auth';
import { DecodedToken } from '@/features/core/types/decodedJwt';

export const signIn = async (payload: SigninFormType) => {
	try {
		const data = await apiService<SigninResponse>('/auth/login', {
			method: 'POST',
			body: payload,
		});

		const cookieStore = await cookies();

		const decoded = jwtDecode(data.token) as DecodedToken;
		const expiresInMs = (decoded.exp as number) * 1000;
		const token = await encrypt(
			{ ...decoded, token: data.token },
			expiresInMs
		);

		cookieStore.set('token', token, {
			path: '/',
			expires: new Date(expiresInMs),
			secure: false,
			httpOnly: true,
		});

		return {
			name: decoded.sub,
			role: decoded.role,
		};
	} catch (error) {
		console.error('Erro ao realizar login: ', error);
		throw error;
	}
};
