'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
	RemessaTable,
	RemessaDetailsSidesheet,
	RemessaStatusCard,
	WineTypeCard,
	QualityRateCard,
	useRemessas,
} from '@/features/remessa';

export default function RemessasPage() {
	const { remessas, stats, loading, error, refreshRemessas } = useRemessas();

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
					<RemessaDetailsSidesheet onRemessaSaved={refreshRemessas} />
				</div>
				<TabsContent value='overview' className='space-y-4'>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						<div>
							<QualityRateCard />
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
