'use client';

import {
	SheetContent,
	SheetHeader,
	SheetTitle,
	Button,
	Sheet,
	SheetTrigger,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	Separator,
	Skeleton,
} from '@/components';
import { useEffect, useState } from 'react';
import { TankWithDetails } from '../types/tankWithDetails';
import useApiCall from '@/features/core/hooks/useApiCall';
import { getTankData } from '../services/tankService';
import { ChartGantt } from 'lucide-react';
import { TankVolumeGraph } from './tank-volume-graph';
import { SimpleNumberCardIndicator } from '@/features/core/components/simple-number-card-indicator';
import TankDetailsSidesheetSkeleton from './tank-details-sidesheet-skeleton';
import { toast } from 'sonner';
import SectionSeparator from '@/features/core/components/section-separator';

interface TankDetailsSidesheetProps {
	tankId: string;
}

export default function TankDetailsSidesheet({
	tankId,
}: TankDetailsSidesheetProps) {
	const [tank, setTank] = useState<TankWithDetails>();
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const { action, isLoading } = useApiCall(() => getTankData(tankId));

	async function fetchTankData() {
		try {
			const data = await action();

			setTank(data);
		} catch (error) {
			console.log('🚀 -> error:', error);
			toast.error(
				'Houve um erro ao buscar os dados do tanque. Se o problema persistir, contate o suporte.'
			);
		}
	}

	useEffect(() => {
		if (isSheetOpen) {
			fetchTankData();
		}
	}, [isSheetOpen]);

	return (
		<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
			<Tooltip>
				<TooltipTrigger asChild>
					<SheetTrigger asChild>
						<Button
							variant='outline'
							className='cursor-pointer has-[>svg]:py-2 has-[>svg]:px-2.5 h-auto'
						>
							<ChartGantt className='text-neutral-500 size-3.5' />
						</Button>
					</SheetTrigger>
				</TooltipTrigger>

				<TooltipContent>
					<p>Detalhamento do tanque</p>
				</TooltipContent>
			</Tooltip>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Detalhamento de tanque</SheetTitle>
				</SheetHeader>

				<div className='h-full overflow-y-scroll'>
					{isLoading ? (
						<TankDetailsSidesheetSkeleton />
					) : (
						<div className='flex flex-col h-full'>
							<SectionSeparator sectionTitle='Dados gerais' />

							<div className='flex flex-col gap-1 text-sm mb-4'>
								<span>
									<span className='font-medium'>
										Número do depósito:
									</span>{' '}
									{tank?.numeroDeposito}
								</span>
								<span>
									<span className='font-medium'>
										Tipo do depósito
									</span>{' '}
									{tank?.tipoDeposito}
								</span>
								<span>
									<span className='font-medium'>
										Capacidade:
									</span>{' '}
									{tank?.capacidadeDeposito} Litros
								</span>
								<span>
									<span className='font-medium'>
										Conteúdo:
									</span>{' '}
									{tank?.conteudo ?? '--'}
								</span>
							</div>

							<SectionSeparator sectionTitle='Métricas' />

							<div className='grid grid-cols-2 grid-rows-2 gap-4 flex-1'>
								<TankVolumeGraph
									totalCapacity={tank?.capacidadeDeposito}
									occupiedVolume={tank?.volumeConteudo}
								/>

								<SimpleNumberCardIndicator
									title='Temperatura'
									description='Última temperatura registrada.'
									value={tank?.temperatura}
									unit='°C'
								/>

								<SimpleNumberCardIndicator
									title='Densidade'
									description='Última densidade registrada.'
									value={tank?.densidade}
									unit='kg/m³'
								/>

								<SimpleNumberCardIndicator
									title='Pressão'
									description='Última pressão registrada.'
									value={tank?.pressao}
									unit='Pa'
								/>
							</div>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
