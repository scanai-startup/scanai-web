'use client';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Barrel } from 'lucide-react';
import { Button, Input, Label } from '@/components';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

//TODO: conversar sobre a possibilidade de componentizar essa table pra um componente table generico
export function TanksTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<div className='flex items-end pb-4 gap-2'>
				<div className='w-md'>
					<Label htmlFor='depositNumber' className='mb-1.5'>
						Pesquisa por depósito
					</Label>
					<Input
						id='depositNumber'
						placeholder='Digite o número do depósito'
						// value={
						// 	(table
						// 		.getColumn('email')
						// 		?.getFilterValue() as string) ?? ''
						// }
						// onChange={(event) =>
						// 	table
						// 		.getColumn('email')
						// 		?.setFilterValue(event.target.value)
						// }
					/>
				</div>
				<Button className='cursor-pointer'>Buscar</Button>
			</div>
			<div className='overflow-hidden rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && 'selected'
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length}>
									<div className='flex flex-col items-center justify-center my-12 gap-4'>
										<Barrel
											size={72}
											className='text-red-400 bg-red-100 p-4 rounded-full'
										/>
										<div>
											<h4 className='text-lg font-semibold'>
												Não há nenhum dado sobre seus
												tanques ainda.
											</h4>
											<p>
												Para visualizar as informações,
												realize a gestão de seus
												tanques.
											</p>
										</div>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
