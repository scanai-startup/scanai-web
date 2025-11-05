import { useState, useCallback } from 'react';

export default function useApiCall<TPayload, TResponse>(
	fn: (payload: TPayload) => Promise<TResponse>
) {
	const [isLoading, setIsLoading] = useState(false);

	const action = useCallback(
		async (payload: TPayload) => {
			try {
				setIsLoading(true);
				const data = await fn(payload);

				return data;
			} catch (error) {
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[fn]
	);

	return { action, isLoading };
}
