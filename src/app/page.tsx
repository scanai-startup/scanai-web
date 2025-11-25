import { SignInForm } from '@/features/auth';

export default function Page() {
	return (
		<div className='relative h-[calc(100vh-80px)] w-full'>
			<div className='flex aspect-square h-full w-full max-w-5xl flex-row mx-auto items-center justify-center gap-8 text-center'>
				<div className='flex flex-col items-center justify-center gap-8'>
					<div className='text-5xl font-bold'>
						SCAN.<span className='text-[#ED2860]'>AI</span>
					</div>
					<SignInForm className='min-w-sm' />
				</div>
			</div>
		</div>
	);
}
