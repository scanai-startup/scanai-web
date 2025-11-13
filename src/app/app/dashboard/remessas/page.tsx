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
import PageHeader from '@/features/core/components/page-header';

export default function RemessasPage() {
	const { remessas, stats, loading, refreshRemessas } = useRemessas();

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

	return (
		<div>
			<div className='flex items-center justify-between space-y-2'>
				<PageHeader
					title='gestão de remessas'
					description='acompanhe o recebimento e controle de qualidade das remessas.'
				/>
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
