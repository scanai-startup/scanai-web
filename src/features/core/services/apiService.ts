'use server';

import { decrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL;

interface Options extends Omit<RequestInit, 'body'> {
	body?: object;
}

export async function apiService<T>(
	endpoint: string,
	options: Options = {}
): Promise<T> {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;
	const url = `${API_URL}${endpoint}`;

	const defaultHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (token) {
		const payload = await decrypt(token);

		if (payload) {
			defaultHeaders['Authorization'] = `Bearer ${payload.jwt}`;
		}
	}

	const customHeaders = {
		...defaultHeaders,
		...(options.headers || {}),
	};

	const config: RequestInit = {
		...options,
		headers: customHeaders,
		body:
			options.body && typeof options.body !== 'string'
				? JSON.stringify(options.body)
				: options.body,
	};

	try {
		const response = await fetch(url, config);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({
				message: `Erro HTTP ${response.status}: ${response.statusText}`,
			}));

			throw new Error(
				errorData.message ||
					'Ocorreu um erro na requisição, por favor tente novamente. Se o problema persistir, entre em contato.'
			);
		}

		const contentType = response.headers.get('content-type');
		if (contentType && contentType.includes('application/json')) {
			return response.json() as Promise<T>;
		}

		return response.text() as unknown as Promise<T>;
	} catch (error) {
		console.error('API Service Error:', error);
		throw error;
	}
}
