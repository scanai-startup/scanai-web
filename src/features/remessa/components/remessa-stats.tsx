'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, Scale, TrendingUp } from 'lucide-react';
import { RemessaStats } from '../types';

interface RemessaStatsProps {
	stats: RemessaStats;
}

export function RemessaStatsComponent({ stats }: RemessaStatsProps) {
	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
			<Card className='hover:shadow-md transition-shadow'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Total de Remessas
					</CardTitle>
					<Truck className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold text-blue-600'>
						{stats.totalRemessas}
					</div>
					<p className='text-xs text-muted-foreground'>
						{stats.remessasAtivas} ativas, {stats.remessasInativas}{' '}
						inativas
					</p>
				</CardContent>
			</Card>

			<Card className='hover:shadow-md transition-shadow'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Total de Caixas
					</CardTitle>
					<Package className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold text-green-600'>
						{stats.totalCaixas.toLocaleString()}
					</div>
					<p className='text-xs text-muted-foreground'>
						Caixas recebidas
					</p>
				</CardContent>
			</Card>

			<Card className='hover:shadow-md transition-shadow'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Peso Total
					</CardTitle>
					<Scale className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold text-purple-600'>
						{(stats.pesoTotal / 1000).toFixed(1)}t
					</div>
					<p className='text-xs text-muted-foreground'>
						{stats.pesoTotal.toLocaleString()} kg
					</p>
				</CardContent>
			</Card>

			<Card className='hover:shadow-md transition-shadow'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Taxa de Aprovação
					</CardTitle>
					<TrendingUp className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold text-orange-600'>
						{stats.totalRemessas > 0
							? Math.round(
									(stats.remessasAtivas /
										stats.totalRemessas) *
										100
							  )
							: 0}
						%
					</div>
					<p className='text-xs text-muted-foreground'>
						Remessas aprovadas
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
