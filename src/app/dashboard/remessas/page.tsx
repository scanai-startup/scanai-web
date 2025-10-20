'use client';

import { useEffect, useState } from 'react';
import {
	Separator,
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components';

import {
	RemessaTable,
	RemessaStatsComponent,
	Remessa,
	RemessaStats,
	RemessaService,
} from '@/features/remessa';

// Dados mockados temporários
import mockData from './remessas-mock.json';

export default function RemessasPage() {
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

	useEffect(() => {
		const fetchRemessas = async () => {
			try {
				setLoading(true);

				let data: Remessa[];

				try {
					// Tentar buscar dados do backend
					data = await RemessaService.getAllRemessas();
				} catch (backendError) {
					console.warn(
						'Backend não disponível, usando dados mockados:',
						backendError
					);
					// Fallback para dados mockados se o backend não estiver disponível
					data = mockData as Remessa[];
					// Simular delay de API
					await new Promise((resolve) => setTimeout(resolve, 500));
				}

				setRemessas(data);

				// Calcular estatísticas
				const calculatedStats: RemessaStats = {
					totalRemessas: data.length,
					totalCaixas: data.reduce(
						(sum, remessa) => sum + remessa.qttcaixa,
						0
					),
					pesoTotal: data.reduce(
						(sum, remessa) => sum + remessa.peso,
						0
					),
					remessasAtivas: data.filter((r) => r.valid).length,
					remessasInativas: data.filter((r) => !r.valid).length,
					tiposVinho: data.reduce((acc, remessa) => {
						acc[remessa.tipovinho] =
							(acc[remessa.tipovinho] || 0) + 1;
						return acc;
					}, {} as Record<string, number>),
				};

				setStats(calculatedStats);
			} catch (err) {
				setError('Erro ao carregar remessas');
				console.error('Erro ao buscar remessas:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchRemessas();
	}, []);

	if (loading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
					<p className='text-muted-foreground'>
						Carregando remessas...
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<p className='text-destructive mb-4'>{error}</p>
					<button
						onClick={() => window.location.reload()}
						className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90'
					>
						Tentar novamente
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<header className='flex h-16 shrink-0 items-center gap-2'>
				<div className='flex items-center gap-2 px-4'>
					<Separator
						orientation='vertical'
						className='mr-2 data-[orientation=vertical]:h-4'
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className='hidden md:block'>
								<BreadcrumbLink href='/dashboard'>
									Dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className='hidden md:block' />
							<BreadcrumbItem>
								<BreadcrumbPage>
									Gestão de Remessas
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			<div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
				<div className='bg-muted/50 rounded-xl p-4'>
					<RemessaStatsComponent stats={stats} />
				</div>

				<div className='bg-muted/50 rounded-xl'>
					<RemessaTable data={remessas} />
				</div>
			</div>
		</>
	);
}
