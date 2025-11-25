import { Separator } from '@/components';
import { Skeleton } from '@/components/ui/skeleton';

export default function TankDetailsSidesheetSkeleton() {
	return (
		<>
			<div className='flex flex-col h-full'>
				<div className='flex items-center flex-nowrap gap-2'>
					<Skeleton className='h-4 w-28' />
					<Separator className='flex-1 my-4' />
				</div>

				<div className='flex flex-col gap-2 text-sm font-medium mb-4'>
					<Skeleton className='h-4 w-64' />
					<Skeleton className='h-4 w-64' />
					<Skeleton className='h-4 w-64' />
					<Skeleton className='h-4 w-64' />
				</div>

				<div className='flex items-center text-xs text-neutral-500 flex-nowrap gap-2'>
					<Skeleton className='h-4 w-32' />
					<Separator className='flex-1 my-4' />
				</div>

				<div className='grid grid-cols-2 grid-rows-2 gap-4 flex-1'>
					<Skeleton className='w-full h-full rounded-md' />
					<Skeleton className='w-full h-full rounded-md' />
					<Skeleton className='w-full h-full rounded-md' />
					<Skeleton className='w-full h-full rounded-md' />
				</div>
			</div>
		</>
	);
}
