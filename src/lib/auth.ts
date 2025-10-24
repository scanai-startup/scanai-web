/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { jwtVerify, SignJWT } from 'jose';

const secret = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(secret);

export async function encrypt(payload: any, expiresInMs: number) {
	return await new SignJWT({ ...payload })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(new Date(expiresInMs))
		.sign(secretKey);
}

export async function decrypt(token: any) {
	try {
		const { payload } = await jwtVerify(token, secretKey, {
			algorithms: ['HS256'],
		});

		return payload as any;
	} catch (error) {
		console.error('Erro no token: ', error);
		return false;
	}
}

export async function getUserData(token: string) {
	const payload = await decrypt(token);

	if (payload) {
		return {
			name: payload.sub,
			role: payload.role,
		};
	}

	return null;
}
