'use client';

import {
	SidebarTrigger,
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '@/components';
import { Separator } from '@/components';
import { usePathname } from 'next/navigation';

export default function DynamicBreadcrumb() {
	const pathname = usePathname();

	return (
		<header className='flex h-16 shrink-0 items-center gap-2'>
			<div className='flex items-center gap-2'>
				<SidebarTrigger className='-ml-1' />
				<Separator
					orientation='vertical'
					className='mr-2 data-[orientation=vertical]:h-4'
				/>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className='hidden md:block'>
							<BreadcrumbLink href='#'>
								Funcionalidades Principais
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className='hidden md:block' />
						<BreadcrumbItem>
							<BreadcrumbPage>Visão Geral</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
