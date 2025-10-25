import { Skeleton } from '@/components';

export default function TanksTableSkeleton() {
	return (
		<div className='space-y-4'>
			<div className='flex gap-2'>
				<Skeleton className='h-10 w-md' />
				<Skeleton className='h-10 w-20' />
			</div>

			<div className='overflow-hidden rounded-md border'>
				<div className='grid grid-cols-[repeat(7,1fr)_40px] gap-4 p-4'>
					<Skeleton className='h-4 w-24' />
					<Skeleton className='h-4 w-24' />
					<Skeleton className='h-4 w-24' />
					<Skeleton className='h-4 w-20' />
					<Skeleton className='h-4 w-24' />
					<Skeleton className='h-4 w-24' />
					<Skeleton className='h-4 w-20' />
				</div>

				<div className='divide-y'>
					{Array.from({ length: 10 }).map((_, i) => (
						<div
							key={i}
							className='grid grid-cols-[repeat(7,1fr)_40px] gap-4 p-4 items-center'
						>
							<Skeleton className='h-4 w-32' />
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-4 w-28' />
							<Skeleton className='h-4 w-32' />
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-4 w-28' />
							<Skeleton className='h-4 w-28' />
							<Skeleton className='h-8 w-8 rounded-md' />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
