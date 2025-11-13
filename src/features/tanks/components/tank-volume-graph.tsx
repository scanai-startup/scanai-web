'use client';

import { Pie, PieChart } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
	free: {
		label: 'Livre',
	},
	occupied: {
		label: 'Ocupado',
	},
} satisfies ChartConfig;

interface TankVolumeGraphProps {
	occupiedVolume: number | undefined | null;
	totalCapacity: number | undefined | null;
}

export function TankVolumeGraph({
	occupiedVolume,
	totalCapacity,
}: TankVolumeGraphProps) {
	const chartData = [
		{
			type: 'free',
			volume: totalCapacity,
			fill: 'var(--color-chart-free)',
		},
		{
			type: 'occupied',
			volume: occupiedVolume,
			fill: 'var(--color-chart-occupied)',
		},
	];

	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Ocupação (L)</CardTitle>
				<CardDescription>Volume livre e em uso.</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col justify-center flex-1 pb-0'>
				<ChartContainer config={chartConfig} className='aspect-square'>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey='volume'
							nameKey='type'
							innerRadius={40}
						/>
						<ChartLegend
							content={<ChartLegendContent nameKey='type' />}
							className='-translate-y-2 flex-wrap gap-2 *:basis-1/5 *:justify-center'
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
