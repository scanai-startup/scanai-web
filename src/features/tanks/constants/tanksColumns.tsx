'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TankWithDetails } from '../types/tankWithDetails';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { ChartGantt } from 'lucide-react';

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
	},
	{
		accessorKey: 'temperatura',
		header: 'Temperatura (°C)',
	},
	{
		accessorKey: 'densidade',
		header: 'Densidade (kg/m³)',
	},
	{
		accessorKey: 'pressao',
		header: 'Pressão (Pa)',
	},
	{
		accessorKey: 'conteudo',
		header: 'Conteúdo',
	},
	{
		id: 'actions',
		cell: () => {
			return (
				<div className='flex gap-2'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='outline'
								className='cursor-pointer has-[>svg]:py-2 has-[>svg]:px-2.5 h-auto'
							>
								<ChartGantt className='text-neutral-500 size-3.5' />
							</Button>
						</TooltipTrigger>

						<TooltipContent>
							<p>Detalhamento do tanque</p>
						</TooltipContent>
					</Tooltip>
				</div>
			);
		},
	},
];
