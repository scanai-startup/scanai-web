import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerClose,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { Remessa } from '../../types';
import { RemessaDetailsSidesheet } from '../remessa-details-sidesheet';

function VerMaisButton({ remessa }: { remessa: Remessa }) {
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
			direction={isMobile ? 'bottom' : 'right'}
		>
			<DrawerTrigger asChild>
				<Button variant='outline' size='sm'>
					Ver mais
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Detalhes da Remessa #{remessa.id}</DrawerTitle>
					<DrawerDescription>
						Informações completas da remessa
					</DrawerDescription>
				</DrawerHeader>
				<div className='px-4 py-2 space-y-6'>
					<div className='grid grid-cols-2 gap-4 text-sm'>
						<div>
							<span className='font-medium'>
								Data de Chegada:
							</span>{' '}
							{new Date(remessa.datachegada).toLocaleDateString(
								'pt-BR'
							)}
						</div>
						<div>
							<span className='font-medium'>
								Número do Talão:
							</span>{' '}
							{remessa.numerotalao}
						</div>
						<div>
							<span className='font-medium'>Casta:</span>{' '}
							{remessa.casta}
						</div>
						<div>
							<span className='font-medium'>Tipo de Vinho:</span>{' '}
							{remessa.tipovinho}
						</div>
						<div>
							<span className='font-medium'>
								Quantidade de Caixas:
							</span>{' '}
							{remessa.qttcaixa}
						</div>
						<div>
							<span className='font-medium'>Peso:</span>{' '}
							{remessa.peso.toLocaleString()} kg
						</div>
						<div>
							<span className='font-medium'>Sanidade:</span>{' '}
							<span
								className={
									remessa.sanidade >= 90
										? 'text-green-600'
										: 'text-red-600'
								}
							>
								{remessa.sanidade}%
							</span>
						</div>
						<div>
							<span className='font-medium'>Número do Lote:</span>{' '}
							{remessa.numerolote}
						</div>
						<div>
							<span className='font-medium'>SO2:</span>{' '}
							{remessa.so2}
						</div>
						<div>
							<span className='font-medium'>Status:</span>{' '}
							<span
								className={
									remessa.valid
										? 'text-green-600'
										: 'text-gray-600'
								}
							>
								{remessa.valid ? 'Ativa' : 'Inativa'}
							</span>
						</div>
					</div>

					<div className='space-y-2'>
						<h4 className='font-medium'>Histórico de Qualidade</h4>
						<div className='border rounded-lg p-3'>
							<div className='flex justify-between items-center mb-2'>
								<span className='text-sm'>Sanidade</span>
								<span
									className={`text-sm font-medium ${
										remessa.sanidade >= 90
											? 'text-green-600'
											: 'text-red-600'
									}`}
								>
									{remessa.sanidade}%
								</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2'>
								<div
									className={`h-2 rounded-full ${
										remessa.sanidade >= 90
											? 'bg-green-500'
											: 'bg-red-500'
									}`}
									style={{ width: `${remessa.sanidade}%` }}
								></div>
							</div>
							<p className='text-xs text-gray-600 mt-1'>
								{remessa.sanidade >= 90
									? 'Aprovado para produção'
									: 'Requer atenção'}
							</p>
						</div>
					</div>
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant='outline'>Fechar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export const remessaColumns: ColumnDef<Remessa>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => (
			<div className='font-medium'>{row.getValue('id')}</div>
		),
	},
	{
		accessorKey: 'datachegada',
		header: 'Data de Chegada',
		cell: ({ row }) => {
			const date = new Date(row.getValue('datachegada'));
			return (
				<div className='text-sm'>
					{date.toLocaleDateString('pt-BR')}
				</div>
			);
		},
	},
	{
		accessorKey: 'casta',
		header: 'Casta',
		cell: ({ row }) => (
			<div className='font-medium'>{row.getValue('casta')}</div>
		),
	},
	{
		accessorKey: 'tipovinho',
		header: 'Tipo de Vinho',
		cell: ({ row }) => (
			<div className='font-medium'>{row.getValue('tipovinho')}</div>
		),
	},
	{
		accessorKey: 'qttcaixa',
		header: 'Caixas',
		cell: ({ row }) => (
			<div className='text-right font-medium'>
				{row.getValue('qttcaixa')}
			</div>
		),
	},
	{
		accessorKey: 'peso',
		header: 'Peso (kg)',
		cell: ({ row }) => (
			<div className='text-right font-medium'>
				{(row.getValue('peso') as number).toLocaleString()}
			</div>
		),
	},
	{
		accessorKey: 'numerolote',
		header: 'Nº Lote',
		cell: ({ row }) => (
			<div className='font-medium'>{row.getValue('numerolote')}</div>
		),
	},
	{
		accessorKey: 'sanidade',
		header: 'Sanidade (%)',
		cell: ({ row }) => {
			const sanidade = row.getValue('sanidade') as number;
			return <div className='text-right font-medium'>{sanidade}%</div>;
		},
	},
	{
		accessorKey: 'valid',
		header: 'Status',
		cell: ({ row }) => {
			const isValid = row.getValue('valid') as boolean;
			return (
				<div
					className={`text-right font-medium ${
						isValid ? 'text-green-600' : 'text-gray-600'
					}`}
				>
					{isValid ? 'Ativa' : 'Inativa'}
				</div>
			);
		},
	},
	{
		id: 'actions',
		header: 'Ações',
		cell: ({ row }) => {
			const remessa = row.original;
			return (
				<div className='flex items-center space-x-2'>
					<VerMaisButton remessa={remessa} />
					<RemessaDetailsSidesheet
						remessa={remessa}
						mode='edit'
						onRemessaSaved={() => window.location.reload()}
					/>
				</div>
			);
		},
	},
];
