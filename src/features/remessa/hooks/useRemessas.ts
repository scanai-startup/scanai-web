import { useState, useEffect, useCallback } from 'react';
import { Remessa, RemessaStats } from '../types';
import { RemessaService } from '../services/remessa-service';

export function useRemessas() {
	const [remessas, setRemessas] = useState<Remessa[]>([]);
	const [stats, setStats] = useState<RemessaStats>({
		totalRemessas: 0,
		totalCaixas: 0,
		pesoTotal: 0,
		remessasAtivas: 0,
		remessasInativas: 0,
		tiposVinho: {},
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const calculateStats = (data: Remessa[]): RemessaStats => {
		return {
			totalRemessas: data.length,
			totalCaixas: data.reduce(
				(sum, remessa) => sum + remessa.qttcaixa,
				0
			),
			pesoTotal: data.reduce((sum, remessa) => sum + remessa.peso, 0),
			remessasAtivas: data.filter((r) => r.valid).length,
			remessasInativas: data.filter((r) => !r.valid).length,
			tiposVinho: data.reduce((acc, remessa) => {
				acc[remessa.tipovinho] = (acc[remessa.tipovinho] || 0) + 1;
				return acc;
			}, {} as Record<string, number>),
		};
	};

	const fetchRemessas = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			let data: Remessa[];

			try {
				data = await RemessaService.getAllRemessas();
			} catch (backendError) {
				console.warn(
					'Backend não disponível, usando dados mockados:',
					backendError
				);
				// Import dinâmico para evitar problemas de SSR
				const mockData = await import(
					'../../../app/app/dashboard/remessas/remessas-mock.json'
				);
				data = mockData.default as Remessa[];
				await new Promise((resolve) => setTimeout(resolve, 500));
			}

			setRemessas(data);
			setStats(calculateStats(data));
		} catch (err) {
			setError('Erro ao carregar remessas');
			console.error('Erro ao buscar remessas:', err);
		} finally {
			setLoading(false);
		}
	}, []);

	const refreshRemessas = () => {
		fetchRemessas();
	};

	useEffect(() => {
		fetchRemessas();
	}, [fetchRemessas]);

	return {
		remessas,
		stats,
		loading,
		error,
		refreshRemessas,
	};
}
