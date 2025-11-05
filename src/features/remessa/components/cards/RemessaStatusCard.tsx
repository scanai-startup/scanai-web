import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { RemessaStats } from '../../types';

interface RemessaStatusCardProps {
	stats: RemessaStats;
}

export function RemessaStatusCard({ stats }: RemessaStatusCardProps) {
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
