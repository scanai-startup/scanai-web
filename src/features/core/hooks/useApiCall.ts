/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export default function useApiCall<F extends (...args: any[]) => Promise<any>>(
	fn: F
) {
	type Args = Parameters<F>;
	type TResponse = Awaited<ReturnType<F>>;

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<TResponse | null>(null);

	async function action(...args: Args): Promise<TResponse> {
		setIsLoading(true);
		try {
			// forward args exactly as the original function expects
			const res = await fn(...(args as any));
			setData(res);
			return res as TResponse;
		} finally {
			setIsLoading(false);
		}
	}

	return {
		action: action as (...args: Args) => Promise<TResponse>,
		isLoading,
		data,
	};
}
