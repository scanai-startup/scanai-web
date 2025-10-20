'use client';

import * as React from 'react';
import {
	IconChevronDown,
	IconChevronLeft,
	IconChevronRight,
	IconChevronsLeft,
	IconChevronsRight,
	IconCircleCheckFilled,
	IconDotsVertical,
	IconLayoutColumns,
	IconLoader,
	IconPlus,
} from '@tabler/icons-react';
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Remessa } from '../types';

const columns: ColumnDef<Remessa>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<div className='flex items-center justify-center'>
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label='Select all'
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className='flex items-center justify-center'>
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label='Select row'
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
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
			<Badge variant='outline' className='text-muted-foreground px-1.5'>
				{row.getValue('tipovinho')}
			</Badge>
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
			return (
				<div className='text-right'>
					<Badge
						variant={sanidade >= 90 ? 'default' : 'destructive'}
						className='text-xs'
					>
						{sanidade}%
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'valid',
		header: 'Status',
		cell: ({ row }) => (
			<Badge
				variant={row.getValue('valid') ? 'default' : 'secondary'}
				className='text-xs'
			>
				{row.getValue('valid') ? (
					<>
						<IconCircleCheckFilled className='fill-green-500 dark:fill-green-400 mr-1' />
						Ativa
					</>
				) : (
					<>
						<IconLoader className='mr-1' />
						Inativa
					</>
				)}
			</Badge>
		),
	},
	{
		id: 'actions',
		cell: ({}) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
						size='icon'
					>
						<IconDotsVertical />
						<span className='sr-only'>Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-32'>
					<DropdownMenuItem>Visualizar</DropdownMenuItem>
					<DropdownMenuItem>Editar</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant='destructive'>
						Excluir
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
];

export function RemessaTable({ data }: { data: Remessa[] }) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination,
		},
		getRowId: (row) => row.id.toString(),
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className='w-full'>
			<div className='flex items-center justify-between px-4 lg:px-6 py-4'>
				<div className='flex items-center gap-2'>
					<Input
						placeholder='Buscar por ID ou lote...'
						value={
							(table
								.getColumn('id')
								?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table
								.getColumn('id')
								?.setFilterValue(event.target.value)
						}
						className='max-w-sm'
					/>
					<Select
						value={
							(table
								.getColumn('tipovinho')
								?.getFilterValue() as string) ?? 'todos'
						}
						onValueChange={(value) =>
							table.getColumn('tipovinho')?.setFilterValue(value)
						}
					>
						<SelectTrigger className='w-40'>
							<SelectValue placeholder='Tipo de vinho' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='todos'>Todos</SelectItem>
							<SelectItem value='Tinto'>Tinto</SelectItem>
							<SelectItem value='Branco'>Branco</SelectItem>
							<SelectItem value='Rosé'>Rosé</SelectItem>
						</SelectContent>
					</Select>
					<Select
						value={
							(table
								.getColumn('valid')
								?.getFilterValue() as string) ?? 'all'
						}
						onValueChange={(value) =>
							table.getColumn('valid')?.setFilterValue(value)
						}
					>
						<SelectTrigger className='w-32'>
							<SelectValue placeholder='Status' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>Todos</SelectItem>
							<SelectItem value='true'>Ativas</SelectItem>
							<SelectItem value='false'>Inativas</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='flex items-center gap-2'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm'>
								<IconLayoutColumns />
								<span className='hidden lg:inline'>
									Colunas
								</span>
								<IconChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-56'>
							{table
								.getAllColumns()
								.filter(
									(column) =>
										typeof column.accessorFn !==
											'undefined' && column.getCanHide()
								)
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button variant='outline' size='sm'>
						<IconPlus />
						<span className='hidden lg:inline'>Nova Remessa</span>
					</Button>
				</div>
			</div>

			<div className='overflow-hidden rounded-lg border'>
				<Table>
					<TableHeader className='bg-muted sticky top-0 z-10'>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
										>
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
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									Nenhuma remessa encontrada.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-between px-4 py-4'>
				<div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
					{table.getFilteredSelectedRowModel().rows.length} de{' '}
					{table.getFilteredRowModel().rows.length} linha(s)
					selecionada(s).
				</div>
				<div className='flex w-full items-center gap-8 lg:w-fit'>
					<div className='hidden items-center gap-2 lg:flex'>
						<Label
							htmlFor='rows-per-page'
							className='text-sm font-medium'
						>
							Linhas por página
						</Label>
						<Select
							value={`${table.getState().pagination.pageSize}`}
							onValueChange={(value) => {
								table.setPageSize(Number(value));
							}}
						>
							<SelectTrigger
								size='sm'
								className='w-20'
								id='rows-per-page'
							>
								<SelectValue
									placeholder={
										table.getState().pagination.pageSize
									}
								/>
							</SelectTrigger>
							<SelectContent side='top'>
								{[10, 20, 30, 40, 50].map((pageSize) => (
									<SelectItem
										key={pageSize}
										value={`${pageSize}`}
									>
										{pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='flex w-fit items-center justify-center text-sm font-medium'>
						Página {table.getState().pagination.pageIndex + 1} de{' '}
						{table.getPageCount()}
					</div>
					<div className='ml-auto flex items-center gap-2 lg:ml-0'>
						<Button
							variant='outline'
							className='hidden h-8 w-8 p-0 lg:flex'
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<span className='sr-only'>Primeira página</span>
							<IconChevronsLeft />
						</Button>
						<Button
							variant='outline'
							className='size-8'
							size='icon'
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className='sr-only'>Página anterior</span>
							<IconChevronLeft />
						</Button>
						<Button
							variant='outline'
							className='size-8'
							size='icon'
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className='sr-only'>Próxima página</span>
							<IconChevronRight />
						</Button>
						<Button
							variant='outline'
							className='hidden size-8 lg:flex'
							size='icon'
							onClick={() =>
								table.setPageIndex(table.getPageCount() - 1)
							}
							disabled={!table.getCanNextPage()}
						>
							<span className='sr-only'>Última página</span>
							<IconChevronsRight />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
