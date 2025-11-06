'use client';

import PageHeader from '@/features/core/components/page-header';
import useApiCall from '@/features/core/hooks/useApiCall';
import { TanksTable } from '@/features/tanks/components/tanks-table';
import TanksTableSkeleton from '@/features/tanks/components/tanks-table-skeleton';
import { columns } from '@/features/tanks/constants/tanksColumns';
import { getTanksWithData } from '@/features/tanks/services/tankService';
import { TankWithDetails } from '@/features/tanks/types/tankWithDetails';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function TanksManagementPage() {
	const [tanks, setTanks] = useState<TankWithDetails[]>([]);
	const { action, isLoading } = useApiCall(getTanksWithData);

	async function fetchTanks() {
		try {
			const data = await action();

			setTanks(data);
		} catch (error) {
			console.log('🚀 -> error:', error);
			toast.error(
				'Houve um erro ao buscar os dados dos tanques. Se o problema persistir, contate o suporte.'
			);
		}
	}

	useEffect(() => {
		fetchTanks();
	}, []);

	return (
		<div>
			{/* <DynamicBreadcrumb /> */}
			<PageHeader
				title='gestão de tanques'
				description='gerencie os tanques da sua vinícola'
			/>
			{isLoading ? (
				<TanksTableSkeleton />
			) : (
				<TanksTable data={tanks} columns={columns} />
			)}
		</div>
	);
}
