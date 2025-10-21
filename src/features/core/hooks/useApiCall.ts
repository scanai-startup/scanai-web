import { useState } from 'react';

export default function useApiCall<TPayload, TResponse>(
	fn: (payload: TPayload) => Promise<TResponse>
) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<TResponse>();

	async function action(payload: TPayload) {
		try {
			setIsLoading(true);
			const res = await fn(payload);

			setData(res);
		} catch (error) {
			throw error;
		} finally {
			setIsLoading(false);
		}
	}

	return { action, isLoading, data };
}
