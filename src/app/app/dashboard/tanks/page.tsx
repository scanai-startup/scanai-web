import DynamicBreadcrumb from '@/features/core/components/dynamic-breadcrumb';
import PageHeader from '@/features/core/components/page-header';
import TanksTableClient from '@/features/tanks/components/tanks-table-client';
import TanksTableSkeleton from '@/features/tanks/components/tanks-table-skeleton';
import { Suspense } from 'react';

export default function TanksManagementPage() {
	return (
		<div>
			<DynamicBreadcrumb />
			<PageHeader
				title='gestão de tanques'
				description='gerencie os tanques da sua vinícola'
			/>

			<Suspense fallback={<TanksTableSkeleton />}>
				<TanksTableClient />
			</Suspense>
		</div>
	);
}
