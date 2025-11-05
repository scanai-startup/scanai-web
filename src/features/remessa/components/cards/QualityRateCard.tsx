import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export function QualityRateCard() {
	return (
		<Card className='h-60'>
			<CardHeader className='pb-2'>
				<CardTitle>Taxa de Qualidade</CardTitle>
				<CardDescription>
					Baseado na sanidade das remessas
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col justify-center h-full space-y-2'>
				<div className='text-4xl font-bold'>94%</div>
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
	);
}
