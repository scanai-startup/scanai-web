'use client';

import { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
	RemessaTable,
	Remessa,
	RemessaStats,
	RemessaService,
	NovaRemessaSidebar,
} from '@/features/remessa';

// Dados mockados temporários
import mockData from './remessas-mock.json';

const wineTypeData = [
	{ name: 'Tinto', value: 45, color: '#dc2626' },
	{ name: 'Branco', value: 30, color: '#fbbf24' },
	{ name: 'Rosé', value: 20, color: '#f472b6' },
	{ name: 'Outros', value: 5, color: '#6b7280' },
];

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

	const fetchRemessas = async () => {
		try {
			setLoading(true);

			let data: Remessa[];

			try {
				data = await RemessaService.getAllRemessas();
			} catch (backendError) {
				console.warn(
					'Backend não disponível, usando dados mockados:',
					backendError
				);
				data = mockData as Remessa[];
				await new Promise((resolve) => setTimeout(resolve, 500));
			}

			setRemessas(data);

			const calculatedStats: RemessaStats = {
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

			setStats(calculatedStats);
		} catch (err) {
			setError('Erro ao carregar remessas');
			console.error('Erro ao buscar remessas:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
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
		<div className='flex-1 space-y-4 p-8 pt-6'>
			<div className='flex items-center justify-between space-y-2'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight'>
						Gestão de Remessas
					</h2>
					<p className='text-muted-foreground'>
						Acompanhe o recebimento e controle de qualidade das
						remessas.
					</p>
				</div>
				<div className='flex items-center space-x-2'>
					<Button>Exportar</Button>
				</div>
			</div>

			<Tabs defaultValue='overview' className='space-y-4'>
				<div className='flex items-center justify-between'>
					<TabsList>
						<TabsTrigger value='overview'>Visão Geral</TabsTrigger>
						<TabsTrigger value='analytics'>Análises</TabsTrigger>
					</TabsList>
					<NovaRemessaSidebar onRemessaCreated={fetchRemessas} />
				</div>
				<TabsContent value='overview' className='space-y-4'>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						<div>
							<Card className='h-60'>
								<CardHeader className='pb-2'>
									<CardTitle>Taxa de Qualidade</CardTitle>
									<CardDescription>
										Baseado na sanidade das remessas
									</CardDescription>
								</CardHeader>
								<CardContent className='flex flex-col justify-center h-full space-y-2'>
									<div className='text-4xl font-bold'>
										94%
									</div>
									<p className='text-sm text-muted-foreground'>
										das remessas estão aprovadas
									</p>
									<div className='w-full bg-muted h-2 rounded-full overflow-hidden'>
										<div
											className='h-full bg-green-600'
											style={{ width: '94%' }}
										/>
									</div>
								</CardContent>
							</Card>
						</div>
						<div className='max-h-56'>
							<RemessaStatusCard stats={stats} />
						</div>
						<div className='max-h-56'>
							<WineTypeCard />
						</div>
					</div>
					<div>
						<RemessaTable data={remessas} />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export function RemessaStatusCard({ stats }: { stats: RemessaStats }) {
	const total = stats.remessasAtivas + stats.remessasInativas;
	const getPercent = (value: number) => (value / total) * 100;

	return (
		<Card className='h-60'>
			<CardHeader className='pb-2'>
				<CardTitle>Status das Remessas</CardTitle>
				<CardDescription>Distribuição por status</CardDescription>
			</CardHeader>
			<CardContent className='space-y-3 h-full flex flex-col justify-between'>
				<div className='flex items-center justify-between text-sm'>
					<span className='text-muted-foreground'>Total</span>
					<span className='font-semibold'>{total}</span>
				</div>

				<div className='flex w-full gap-1 h-2 overflow-hidden rounded-full'>
					<div
						className='bg-green-500'
						style={{
							width: `${getPercent(stats.remessasAtivas)}%`,
						}}
					/>
					<div
						className='bg-gray-500'
						style={{
							width: `${getPercent(stats.remessasInativas)}%`,
						}}
					/>
				</div>

				<div className='text-sm space-y-1'>
					<div className='flex justify-between'>
						<span className='flex items-center gap-2'>
							<span className='inline-block w-2 h-2 rounded-full bg-green-500' />
							Ativas
						</span>
						<span>{stats.remessasAtivas} remessas</span>
					</div>
					<div className='flex justify-between'>
						<span className='flex items-center gap-2'>
							<span className='inline-block w-2 h-2 rounded-full bg-gray-500' />
							Inativas
						</span>
						<span>{stats.remessasInativas} remessas</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export function WineTypeCard() {
	const total = wineTypeData.reduce((acc, item) => acc + item.value, 0);

	return (
		<Card className='h-60'>
			<CardHeader className='pb-2'>
				<CardTitle>Tipos de Vinho</CardTitle>
				<CardDescription>Distribuição por tipo</CardDescription>
			</CardHeader>
			<CardContent className='flex items-center justify-between h-full'>
				<div className='relative w-28 h-28'>
					<ResponsiveContainer width='100%' height='100%'>
						<PieChart>
							<Pie
								data={wineTypeData}
								dataKey='value'
								innerRadius={35}
								outerRadius={50}
								paddingAngle={3}
							>
								{wineTypeData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.color}
									/>
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									fontSize: '0.75rem',
									borderRadius: '0.375rem',
								}}
								formatter={(value, name) => [`${value}%`, name]}
							/>
						</PieChart>
					</ResponsiveContainer>
					<div className='absolute inset-0 flex items-center justify-center text-xs font-semibold'>
						{total}%
					</div>
				</div>

				<div className='space-y-1 pl-4 text-xs w-44'>
					{wineTypeData.map((item) => (
						<div
							key={item.name}
							className='flex items-center justify-between'
						>
							<div className='flex items-center gap-2'>
								<span
									className='w-2 h-2 rounded-full'
									style={{ backgroundColor: item.color }}
								/>
								<span>{item.name}</span>
							</div>
							<span className='font-medium'>{item.value}%</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
