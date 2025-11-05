import { useState, useEffect, useMemo, useCallback } from 'react';
import { Remessa, RemessaStats } from '../types';
import { RemessaService } from '../services/remessa-service';
import useApiCall from '@/features/core/hooks/useApiCall';

const calculateStats = (data: Remessa[]): RemessaStats => {
	return {
		totalRemessas: data.length,
		totalCaixas: data.reduce((sum, remessa) => sum + remessa.qttcaixa, 0),
		pesoTotal: data.reduce((sum, remessa) => sum + remessa.peso, 0),
		remessasAtivas: data.filter((r) => r.valid).length,
		remessasInativas: data.filter((r) => !r.valid).length,
		tiposVinho: data.reduce((acc, remessa) => {
			acc[remessa.tipovinho] = (acc[remessa.tipovinho] || 0) + 1;
			return acc;
		}, {} as Record<string, number>),
	};
};

async function fetchRemessasData(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_payload?: undefined
): Promise<Remessa[]> {
	try {
		return await RemessaService.getAllRemessas();
	} catch (backendError) {
		console.warn(
			'Backend não disponível, usando dados mockados:',
			backendError
		);
		const mockData = await import(
			'../../../app/app/dashboard/remessas/remessas-mock.json'
		);
		await new Promise((resolve) => setTimeout(resolve, 500));
		return mockData.default as Remessa[];
	}
}

export function useRemessas() {
	const [remessas, setRemessas] = useState<Remessa[]>([]);
	const { action: fetchRemessas, isLoading } = useApiCall<
		undefined,
		Remessa[]
	>(fetchRemessasData);

	const stats = useMemo(() => calculateStats(remessas), [remessas]);

	const loadRemessas = useCallback(async () => {
		try {
			const data = await fetchRemessas(undefined);
			setRemessas(data);
		} catch (error) {
			console.error('Erro ao buscar remessas:', error);
		}
	}, [fetchRemessas]);

	useEffect(() => {
		loadRemessas();
	}, [loadRemessas]);

	return {
		remessas,
		stats,
		loading: isLoading,
		refreshRemessas: loadRemessas,
	};
}
