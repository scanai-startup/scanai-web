'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface SimpleNumberCardIndicatorProps {
	title: string;
	description: string;
	value: number | undefined | null;
	unit: string;
}

export function SimpleNumberCardIndicator({
	title,
	description,
	value,
	unit,
}: SimpleNumberCardIndicatorProps) {
	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>
					{title} {`(${unit})`}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='text-center m-auto text-5xl space-x-2 font-semibold'>
				<span>{value ?? '--'}</span>
				<span className='font-medium text-3xl text-neutral-500'>
					{unit}
				</span>
				{/* <ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[300px]'
				>
					<PieChart>
						<ChartTooltip
							content={<ChartTooltipContent nameKey='type' />}
						/>
						<Pie
							data={chartData}
							dataKey='volume'
							label={({ payload, ...props }) => {
								return (
									<text
										cx={props.cx}
										cy={props.cy}
										x={props.x}
										y={props.y}
										textAnchor={props.textAnchor}
										dominantBaseline={
											props.dominantBaseline
										}
										fill='hsla(var(--foreground))'
									>
										{payload.volume} L
									</text>
								);
							}}
							nameKey='type'
						/>
						<ChartLegend
							content={<ChartLegendContent nameKey='type' />}
							className='-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center'
						/>
					</PieChart>
				</ChartContainer> */}
			</CardContent>
		</Card>
	);
}
