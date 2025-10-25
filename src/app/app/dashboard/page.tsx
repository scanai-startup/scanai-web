import { ChartBarInteractive, DataTable } from '@/features/dashboard';
import data from './data.json';
import { WineProductionCard } from '@/features/dashboard';
import TankOccupancy from '@/features/dashboard/components/chart/tank-ocuppancy';

export default function Page() {
	return (
		<>
			<div className='flex flex-1 flex-col gap-4'>
				<div className='grid gap-4 md:grid-cols-[minmax(0,1fr)_400px]'>
					<div className='bg-muted/50 rounded-xl flex flex-col gap-4 h-fit'>
						<div className='flex flex-col md:flex-row gap-4 justify-between'>
							<div className='w-full md:w-1/2'>
								<ChartBarInteractive />
							</div>
							<div className='w-full md:w-1/2'>
								<TankOccupancy />
							</div>
						</div>
					</div>

					<div className='bg-muted/50 rounded-xl h-full'>
						<WineProductionCard />
					</div>
				</div>

				<div className='bg-muted/50 rounded-xl'>
					<DataTable data={data} />
				</div>
			</div>
		</>
	);
}
