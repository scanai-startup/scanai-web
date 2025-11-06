'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TankWithDetails } from '../types/tankWithDetails';
import { Progress } from '@/components';
import TankDetailsSidesheet from '../components/tank-details-sidesheet';

export const columns: ColumnDef<TankWithDetails>[] = [
	{
		accessorKey: 'numeroDeposito',
		header: 'Deposito',
	},
	{
		accessorKey: 'tipoDeposito',
		header: 'Tipo',
	},
	{
		accessorKey: 'capacidadeDeposito',
		header: 'Capacidade (L)',
	},
	{
		accessorKey: 'volumeConteudo',
		header: 'Volume em uso (L)',
		cell: ({ row }) => {
			const inUseVolume: number = row.getValue('volumeConteudo') ?? 0;
			const capacity: number = row.getValue('capacidadeDeposito');
			const progress: number = (inUseVolume / capacity) * 100;

			return (
				<div>
					<p className='text-end text-xs mb-1 font-medium text-neutral-700'>
						{inUseVolume}/{capacity}
					</p>
					<Progress value={progress} max={10000} />
				</div>
			);
		},
	},
	{
		accessorKey: 'temperatura',
		header: 'Temperatura (°C)',
		cell: ({ row }) => {
			const temperature: null | undefined | number =
				row.getValue('temperatura');

			return <span>{temperature != null ? temperature : '--'}</span>;
		},
	},
	{
		accessorKey: 'densidade',
		header: 'Densidade (kg/m³)',
		cell: ({ row }) => {
			const density: null | undefined | number =
				row.getValue('densidade');

			return <span>{density != null ? density : '--'}</span>;
		},
	},
	{
		accessorKey: 'pressao',
		header: 'Pressão (Pa)',
		cell: ({ row }) => {
			const pressure: null | undefined | number = row.getValue('pressao');

			return <span>{pressure != null ? pressure : '--'}</span>;
		},
	},
	{
		accessorKey: 'conteudo',
		header: 'Conteúdo',
		cell: ({ row }) => {
			const content: null | undefined | number = row.getValue('conteudo');

			return <span>{content != null ? content : '--'}</span>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const { idDeposito } = row.original;

			return <TankDetailsSidesheet tankId={idDeposito.toString()} />;
		},
	},
];
