import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const wineTypeData = [
	{ name: 'Tinto', value: 45, color: '#dc2626' },
	{ name: 'Branco', value: 30, color: '#fbbf24' },
	{ name: 'Rosé', value: 20, color: '#f472b6' },
	{ name: 'Outros', value: 5, color: '#6b7280' },
];

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
