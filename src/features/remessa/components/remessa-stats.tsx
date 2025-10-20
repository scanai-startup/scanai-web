'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RemessaStats } from '../types';

interface RemessaStatsProps {
	stats: RemessaStats;
}

export function RemessaStatsComponent({ stats }: RemessaStatsProps) {
	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Total de Remessas
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>
						{stats.totalRemessas}
					</div>
					<p className='text-xs text-muted-foreground'>
						{stats.remessasAtivas} ativas, {stats.remessasInativas}{' '}
						inativas
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Total de Caixas
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>
						{stats.totalCaixas}
					</div>
					<p className='text-xs text-muted-foreground'>
						Caixas recebidas
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Peso Total
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>
						{(stats.pesoTotal / 1000).toFixed(1)}t
					</div>
					<p className='text-xs text-muted-foreground'>
						{stats.pesoTotal.toLocaleString()} kg
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Status das Remessas
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex gap-2'>
						<Badge variant='default' className='text-xs'>
							{stats.remessasAtivas} Ativas
						</Badge>
						<Badge variant='secondary' className='text-xs'>
							{stats.remessasInativas} Inativas
						</Badge>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
