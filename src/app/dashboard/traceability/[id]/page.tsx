'use client';

import * as React from 'react';
import {
	IconCalendar,
	IconClock,
	IconDroplet,
	IconFlask,
	IconGalaxy,
	IconBottle,
	IconBarrel,
	IconFilter,
	IconThermometer,
	IconScale,
	IconMapPin,
	IconUser,
	IconFileText,
	IconCircleCheckFilled,
	IconClock2,
	IconAlertCircle,
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface ProcessStage {
	id: string;
	name: string;
	status: 'completed' | 'in-progress' | 'pending' | 'delayed';
	icon: React.ReactNode;
	startDate?: string;
	endDate?: string;
	duration?: string;
	responsible?: string;
	details: Record<string, any>;
}

interface TraceabilityData {
	notaFiscal: string;
	wine: string;
	vintage: string;
	totalQuantity: number;
	currentStage: string;
	completionPercentage: number;
	estimatedCompletion: string;
	vineyard: {
		name: string;
		location: string;
		area: string;
		soilType: string;
	};
	stages: ProcessStage[];
}

const mockTraceabilityData: TraceabilityData = {
	notaFiscal: '12347',
	wine: 'Syrah',
	vintage: '2025',
	totalQuantity: 5000,
	currentStage: 'Fermentação',
	completionPercentage: 35,
	estimatedCompletion: '14/08/2025',
	vineyard: {
		name: 'Fazenda Planaltino',
		location: 'Lagoa Grande-PE',
		area: '15 hectares',
		soilType: 'Argiloso com boa drenagem',
	},
	stages: [
		{
			id: 'cultivo',
			name: 'Cultivo',
			status: 'completed',
			icon: <IconGalaxy className='w-4 h-4' />,
			startDate: '01/09/2024',
			endDate: '15/01/2025',
			duration: '136 dias',
			responsible: 'João Silva',
			details: {
				area: '2.5 hectares',
				plantType: 'Syrah clone 174',
				soilPreparation: 'Aração profunda e correção pH',
				irrigation: 'Gotejamento controlado',
				treatments: ['Fungicida preventivo', 'Adubação orgânica'],
			},
		},
		{
			id: 'colheita',
			name: 'Colheita',
			status: 'completed',
			icon: <IconScale className='w-4 h-4' />,
			startDate: '15/01/2025',
			endDate: '18/01/2025',
			duration: '3 dias',
			responsible: 'Maria Santos',
			details: {
				method: 'Manual seletiva',
				weather: 'Ensolarado, 22°C',
				brix: '24.5°',
				ph: '3.4',
				totalAcidity: '6.2 g/L',
				boxes: 530,
				weight: '8.5 toneladas',
			},
		},
		{
			id: 'desengace',
			name: 'Desengace',
			status: 'completed',
			icon: <IconDroplet className='w-4 h-4' />,
			startDate: '18/01/2025',
			endDate: '18/01/2025',
			duration: '4 horas',
			responsible: 'Pedro Costa',
			details: {
				equipment: 'Desengaçadeira pneumática',
				yield: '85%',
				temperature: '18°C',
				crushedGrapes: '7.2 toneladas',
				stems: '1.3 toneladas',
			},
		},
		{
			id: 'fermentacao',
			name: 'Fermentação',
			status: 'in-progress',
			icon: <IconFlask className='w-4 h-4' />,
			startDate: '19/01/2025',
			duration: '12-15 dias',
			responsible: 'Ana Oliveira',
			details: {
				type: 'Fermentação alcoólica',
				temperature: '25-28°C',
				yeast: 'Saccharomyces cerevisiae',
				currentDay: 8,
				currentAlcohol: '8.5%',
				density: '1.045',
				tanks: ['Tanque 03', 'Tanque 04'],
			},
		},
		{
			id: 'maceracao',
			name: 'Maceração',
			status: 'pending',
			icon: <IconBarrel className='w-4 h-4' />,
			responsible: 'Ana Oliveira',
			details: {
				duration: '15-20 dias',
				temperature: '22-25°C',
				extraction: 'Cor e taninos',
				technique: 'Remontagem 2x/dia',
			},
		},
		{
			id: 'prensagem',
			name: 'Prensagem',
			status: 'pending',
			icon: <IconFilter className='w-4 h-4' />,
			responsible: 'Carlos Lima',
			details: {
				pressure: '1.5 bar',
				cycles: 3,
				yield: '75-80%',
				separation: 'Vinho gota e prensa',
			},
		},
		{
			id: 'maturacao',
			name: 'Maturação',
			status: 'pending',
			icon: <IconBottle className='w-4 h-4' />,
			responsible: 'Roberto Alves',
			details: {
				duration: '6-12 meses',
				containers: 'Barris de carvalho francês',
				capacity: '225L cada',
				monitoring: 'Análises mensais',
			},
		},
		{
			id: 'filtragem',
			name: 'Filtragem',
			status: 'pending',
			icon: <IconDroplet className='w-4 h-4' />,
			responsible: 'Lucia Ferreira',
			details: {
				type: 'Filtração por placas',
				clarity: 'Cristalina',
				stabilization: 'Tartárica e proteica',
			},
		},
	],
};

function WineTraceability() {
	const [selectedStage, setSelectedStage] =
		React.useState<ProcessStage | null>(null);
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
	const data = mockTraceabilityData;

	function getStatusColor(status: ProcessStage['status']) {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
			case 'in-progress':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
			case 'pending':
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
			case 'delayed':
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
		}
	}

	function getStatusIcon(status: ProcessStage['status']) {
		switch (status) {
			case 'completed':
				return (
					<IconCircleCheckFilled className='w-3 h-3 text-green-600' />
				);
			case 'in-progress':
				return <IconClock2 className='w-3 h-3 text-blue-600' />;
			case 'pending':
				return <IconClock className='w-3 h-3 text-gray-500' />;
			case 'delayed':
				return <IconAlertCircle className='w-3 h-3 text-red-600' />;
			default:
				return <IconClock className='w-3 h-3 text-gray-500' />;
		}
	}

	function ProcessFlow({
		stages,
		currentStage,
	}: {
		stages: ProcessStage[];
		currentStage: string;
	}) {
		return (
			<div className='relative'>
				<div className='flex items-center justify-between mb-8'>
					{stages.map((stage, index) => (
						<React.Fragment key={stage.id}>
							<div className='flex flex-col items-center'>
								<Drawer direction='right'>
									<DrawerTrigger asChild>
										<button
											className={`
                        w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all hover:scale-105 cursor-pointer
                        ${
							stage.status === 'completed'
								? 'bg-green-100 border-green-500 text-green-700 hover:bg-green-200'
								: stage.status === 'in-progress'
									? 'bg-blue-100 border-blue-500 text-blue-700 hover:bg-blue-200'
									: 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
						}
                      `}
										>
											{stage.icon}
										</button>
									</DrawerTrigger>
									<DrawerContent className='max-h-[100vh] w-[600px] max-w-[90vw]'>
										<DrawerHeader>
											<DrawerTitle className='flex items-center gap-2'>
												{stage.icon}
												{stage.name}
											</DrawerTitle>
											<DrawerDescription>
												Detalhes da etapa de{' '}
												{stage.name.toLowerCase()}
											</DrawerDescription>
										</DrawerHeader>
										<div className='px-6 pb-4 overflow-y-auto'>
											<StageDetailContent stage={stage} />
										</div>
										<DrawerFooter>
											<DrawerClose asChild>
												<Button variant='outline'>
													Fechar
												</Button>
											</DrawerClose>
										</DrawerFooter>
									</DrawerContent>
								</Drawer>
								<div className='mt-2 text-center'>
									<div className='text-xs font-medium'>
										{stage.name}
									</div>
									<Badge
										variant='outline'
										className={`mt-1 text-xs ${getStatusColor(stage.status)}`}
									>
										{getStatusIcon(stage.status)}
										{stage.status === 'completed'
											? 'Concluído'
											: stage.status === 'in-progress'
												? 'Em Andamento'
												: stage.status === 'delayed'
													? 'Atrasado'
													: 'Pendente'}
									</Badge>
								</div>
							</div>
							{index < stages.length - 1 && (
								<div
									className={`
                    flex-1 h-0.5 mx-4 transition-colors
                    ${
						stages[index + 1].status === 'completed' ||
						stages[index + 1].status === 'in-progress'
							? 'bg-green-300'
							: 'bg-gray-300'
					}
                  `}
								/>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		);
	}

	function StageDetailContent({ stage }: { stage: ProcessStage }) {
		const getStageSpecificContent = () => {
			switch (stage.id) {
				case 'cultivo':
					return (
						<div className='space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='flex items-center gap-2 text-sm'>
									<IconCalendar className='w-4 h-4 text-muted-foreground' />
									<div>
										<div className='text-muted-foreground'>
											Data de Início
										</div>
										<div className='font-medium'>
											{stage.startDate}
										</div>
									</div>
								</div>
								<div className='flex items-center gap-2 text-sm'>
									<IconCalendar className='w-4 h-4 text-muted-foreground' />
									<div>
										<div className='text-muted-foreground'>
											Data de Conclusão
										</div>
										<div className='font-medium'>
											{stage.endDate}
										</div>
									</div>
								</div>
							</div>

							<Separator />

							<div>
								<h3 className='font-semibold text-lg mb-4 text-blue-700'>
									1. Condições Climáticas
								</h3>
								<div className='space-y-3 text-sm'>
									<div>
										<span className='font-medium text-blue-600'>
											Temperatura:
										</span>{' '}
										Monitoramento de extremos que podem
										prejudicar as uvas, como geadas ou ondas
										de calor.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Precipitação:
										</span>{' '}
										Quantidade e distribuição da chuva ao
										longo do ciclo da videira.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Umidade do ar:
										</span>{' '}
										Altos níveis podem favorecer doenças
										fúngicas.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Exposição solar:
										</span>{' '}
										Impacta diretamente a maturação e o
										desenvolvimento de compostos fenólicos.
									</div>
								</div>
							</div>

							<div>
								<h3 className='font-semibold text-lg mb-4 text-blue-700'>
									2. Características do Solo
								</h3>
								<div className='space-y-3 text-sm'>
									<div>
										<span className='font-medium text-blue-600'>
											Tipo de solo:
										</span>{' '}
										Textura (arenoso, argiloso, etc.),
										drenagem e capacidade de retenção de
										água.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Nutrientes:
										</span>{' '}
										Presença de nitrogênio, fósforo,
										potássio e outros minerais essenciais.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											pH do solo:
										</span>{' '}
										Influencia a absorção de nutrientes e o
										crescimento das videiras.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Conteúdo orgânico:
										</span>{' '}
										Impacta na fertilidade e na microbiota
										do solo.
									</div>
								</div>
							</div>

							<div>
								<h3 className='font-semibold text-lg mb-4 text-blue-700'>
									3. Gestão da Videira
								</h3>
								<div className='space-y-3 text-sm'>
									<div>
										<span className='font-medium text-blue-600'>
											Variedade da uva:
										</span>{' '}
										Algumas são mais sensíveis a condições
										específicas do ambiente.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Idade das videiras:
										</span>{' '}
										Videiras mais antigas podem produzir
										uvas de maior qualidade, embora em menor
										quantidade.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Controle de poda:
										</span>{' '}
										Afeta o rendimento e a qualidade da uva.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Gestão da carga de frutos:
										</span>{' '}
										Equilíbrio entre quantidade e qualidade.
									</div>
								</div>
							</div>

							<div>
								<h3 className='font-semibold text-lg mb-4 text-blue-700'>
									4. Saúde da Plantação
								</h3>
								<div className='space-y-3 text-sm'>
									<div>
										<span className='font-medium text-blue-600'>
											Pragas e doenças:
										</span>{' '}
										Monitoramento e controle de fungos,
										insetos e outras ameaças.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Tratamentos fitossanitários:
										</span>{' '}
										Registro de produtos aplicados e
										intervalos de segurança.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Estresse hídrico:
										</span>{' '}
										Monitorar para evitar déficit ou excesso
										de irrigação.
									</div>
								</div>
							</div>

							<div>
								<h3 className='font-semibold text-lg mb-4 text-blue-700'>
									5. Maturação da Uva
								</h3>
								<div className='space-y-3 text-sm'>
									<div>
										<span className='font-medium text-blue-600'>
											Teor de açúcar (Brix):
										</span>{' '}
										Essencial para determinar o momento
										ideal da colheita.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Acidez (pH e acidez titulável):
										</span>{' '}
										Impacta no equilíbrio do sabor e na
										capacidade de envelhecimento do vinho.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Compostos fenólicos e taninos:
										</span>{' '}
										Contribuem para o corpo, cor e estrutura
										do vinho.
									</div>
									<div>
										<span className='font-medium text-blue-600'>
											Aromas precursores:
										</span>{' '}
										Determinam as características sensoriais
										do produto final.
									</div>
								</div>
							</div>
						</div>
					);

				case 'colheita':
					return (
						<div className='space-y-6'>
							<div className='grid grid-cols-2 gap-4'>
								<Card className='p-4'>
									<h4 className='font-semibold mb-3 text-purple-700'>
										PASSAPORTE COLHEITA
									</h4>
									<div className='space-y-2 text-sm'>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Data:
											</span>
											<span className='font-medium'>
												28/06/2024
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Nº Carrada:
											</span>
											<span className='font-medium'>
												3ª
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Lote:
											</span>
											<span className='font-medium'>
												101 - AIREN
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Hora Saída do Campo:
											</span>
											<span className='font-medium'>
												14:00
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Quantidade de Caixas:
											</span>
											<span className='font-medium'>
												530
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Peso Total:
											</span>
											<span className='font-medium'>
												8.040 KG
											</span>
										</div>
									</div>
								</Card>

								<Card className='p-4'>
									<h4 className='font-semibold mb-3 text-purple-700'>
										PASSAPORTE COLHEITA
									</h4>
									<div className='space-y-2 text-sm'>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Data:
											</span>
											<span className='font-medium'>
												28/06/2024
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Nº Carrada:
											</span>
											<span className='font-medium'>
												3ª
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Lote:
											</span>
											<span className='font-medium'>
												101 - AIREN
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Hora Saída do Campo:
											</span>
											<span className='font-medium'>
												13:00
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Quantidade de Caixas:
											</span>
											<span className='font-medium'>
												530
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Peso Total:
											</span>
											<span className='font-medium'>
												8.360 KG
											</span>
										</div>
									</div>
								</Card>
							</div>

							<Separator />

							<div className='grid grid-cols-2 gap-6'>
								<div>
									<h3 className='font-semibold text-lg mb-4 text-purple-700'>
										Parâmetros de Qualidade
									</h3>
									<div className='space-y-3 text-sm'>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Brix:
											</span>
											<span className='font-medium'>
												24.5°
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												pH:
											</span>
											<span className='font-medium'>
												3.4
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Acidez Total:
											</span>
											<span className='font-medium'>
												6.2 g/L
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-purple-600'>
												Temperatura:
											</span>
											<span className='font-medium'>
												22°C
											</span>
										</div>
									</div>
								</div>

								<div>
									<h3 className='font-semibold text-lg mb-4 text-purple-700'>
										Condições da Colheita
									</h3>
									<div className='space-y-3 text-sm'>
										<div>
											<span className='font-medium text-purple-600'>
												Método:
											</span>{' '}
											Manual seletiva
										</div>
										<div>
											<span className='font-medium text-purple-600'>
												Clima:
											</span>{' '}
											Ensolarado, 22°C
										</div>
										<div>
											<span className='font-medium text-purple-600'>
												Rendimento:
											</span>{' '}
											85%
										</div>
										<div>
											<span className='font-medium text-purple-600'>
												Estado Sanitário:
											</span>{' '}
											Excelente
										</div>
									</div>
								</div>
							</div>
						</div>
					);

				default:
					return (
						<div className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{stage.startDate && (
									<div className='flex items-center gap-2 text-sm'>
										<IconCalendar className='w-4 h-4 text-muted-foreground' />
										<div>
											<div className='text-muted-foreground'>
												Data de Início
											</div>
											<div className='font-medium'>
												{stage.startDate}
											</div>
										</div>
									</div>
								)}
								{stage.endDate && (
									<div className='flex items-center gap-2 text-sm'>
										<IconCalendar className='w-4 h-4 text-muted-foreground' />
										<div>
											<div className='text-muted-foreground'>
												Data de Conclusão
											</div>
											<div className='font-medium'>
												{stage.endDate}
											</div>
										</div>
									</div>
								)}
								{stage.duration && (
									<div className='flex items-center gap-2 text-sm'>
										<IconClock className='w-4 h-4 text-muted-foreground' />
										<div>
											<div className='text-muted-foreground'>
												Duração
											</div>
											<div className='font-medium'>
												{stage.duration}
											</div>
										</div>
									</div>
								)}
								{stage.responsible && (
									<div className='flex items-center gap-2 text-sm'>
										<IconUser className='w-4 h-4 text-muted-foreground' />
										<div>
											<div className='text-muted-foreground'>
												Responsável
											</div>
											<div className='font-medium'>
												{stage.responsible}
											</div>
										</div>
									</div>
								)}
							</div>

							<Separator />

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{Object.entries(stage.details).map(
									([key, value]) => (
										<div key={key} className='text-sm'>
											<div className='text-muted-foreground capitalize mb-1'>
												{key
													.replace(/([A-Z])/g, ' $1')
													.toLowerCase()}
											</div>
											<div className='font-medium'>
												{Array.isArray(value)
													? value.join(', ')
													: String(value)}
											</div>
										</div>
									)
								)}
							</div>
						</div>
					);
			}
		};

		return (
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<Badge className={getStatusColor(stage.status)}>
						{getStatusIcon(stage.status)}
						Status:{' '}
						{stage.status === 'completed'
							? 'Concluído'
							: stage.status === 'in-progress'
								? 'Em Andamento'
								: stage.status === 'delayed'
									? 'Atrasado'
									: 'Pendente'}
					</Badge>
					{stage.responsible && (
						<div className='flex items-center gap-2 text-sm'>
							<IconUser className='w-4 h-4 text-muted-foreground' />
							<span className='text-muted-foreground'>
								Responsável:
							</span>
							<span className='font-medium'>
								{stage.responsible}
							</span>
						</div>
					)}
				</div>

				<Separator />

				{getStageSpecificContent()}
			</div>
		);
	}

	function StageDetails({ stage }: { stage: ProcessStage }) {
		return (
			<Card className='mb-4'>
				<CardHeader className='pb-3'>
					<div className='flex items-center justify-between'>
						<CardTitle className='flex items-center gap-2 text-lg'>
							{stage.icon}
							{stage.name}
						</CardTitle>
						<Badge className={getStatusColor(stage.status)}>
							{getStatusIcon(stage.status)}
							{stage.status === 'completed'
								? 'Concluído'
								: stage.status === 'in-progress'
									? 'Em Andamento'
									: stage.status === 'delayed'
										? 'Atrasado'
										: 'Pendente'}
						</Badge>
					</div>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
						{stage.startDate && (
							<div className='flex items-center gap-2'>
								<IconCalendar className='w-4 h-4 text-muted-foreground' />
								<div>
									<div className='text-muted-foreground'>
										Início
									</div>
									<div className='font-medium'>
										{stage.startDate}
									</div>
								</div>
							</div>
						)}
						{stage.endDate && (
							<div className='flex items-center gap-2'>
								<IconCalendar className='w-4 h-4 text-muted-foreground' />
								<div>
									<div className='text-muted-foreground'>
										Fim
									</div>
									<div className='font-medium'>
										{stage.endDate}
									</div>
								</div>
							</div>
						)}
						{stage.duration && (
							<div className='flex items-center gap-2'>
								<IconClock className='w-4 h-4 text-muted-foreground' />
								<div>
									<div className='text-muted-foreground'>
										Duração
									</div>
									<div className='font-medium'>
										{stage.duration}
									</div>
								</div>
							</div>
						)}
						{stage.responsible && (
							<div className='flex items-center gap-2'>
								<IconUser className='w-4 h-4 text-muted-foreground' />
								<div>
									<div className='text-muted-foreground'>
										Responsável
									</div>
									<div className='font-medium'>
										{stage.responsible}
									</div>
								</div>
							</div>
						)}
					</div>

					<Separator />

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{Object.entries(stage.details).map(([key, value]) => (
							<div key={key} className='text-sm'>
								<div className='text-muted-foreground capitalize mb-1'>
									{key
										.replace(/([A-Z])/g, ' $1')
										.toLowerCase()}
								</div>
								<div className='font-medium'>
									{Array.isArray(value)
										? value.join(', ')
										: String(value)}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className='container mx-auto p-6 max-w-6xl'>
			{/* Header */}
			<div className='mb-8'>
				<div className='flex items-center justify-between mb-4'>
					<div>
						<h1 className='text-3xl font-bold'>
							Rastreabilidade - NF {data.notaFiscal}
						</h1>
						<p className='text-muted-foreground'>
							{data.wine} • Safra {data.vintage} •{' '}
							{data.totalQuantity.toLocaleString()} litros
						</p>
					</div>
					<Badge variant='outline' className='text-sm'>
						<IconFileText className='w-4 h-4 mr-1' />
						Nota Fiscal {data.notaFiscal}
					</Badge>
				</div>

				<Card className='mb-6'>
					<CardContent className='pt-6'>
						<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
							<div className='flex items-center gap-3'>
								<IconMapPin className='w-5 h-5 text-muted-foreground' />
								<div>
									<div className='text-sm text-muted-foreground'>
										Vinhedo
									</div>
									<div className='font-medium'>
										{data.vineyard.name}
									</div>
									<div className='text-xs text-muted-foreground'>
										{data.vineyard.location}
									</div>
								</div>
							</div>
							<div className='flex items-center gap-3'>
								<IconThermometer className='w-5 h-5 text-muted-foreground' />
								<div>
									<div className='text-sm text-muted-foreground'>
										Etapa Atual
									</div>
									<div className='font-medium'>
										{data.currentStage}
									</div>
								</div>
							</div>
							<div className='flex items-center gap-3'>
								<IconClock className='w-5 h-5 text-muted-foreground' />
								<div>
									<div className='text-sm text-muted-foreground'>
										Previsão
									</div>
									<div className='font-medium'>
										{data.estimatedCompletion}
									</div>
								</div>
							</div>
							<div className='flex items-center gap-3'>
								<IconCircleCheckFilled className='w-5 h-5 text-green-600' />
								<div>
									<div className='text-sm text-muted-foreground'>
										Progresso
									</div>
									<div className='font-medium'>
										{data.completionPercentage}%
									</div>
									<Progress
										value={data.completionPercentage}
										className='w-full mt-1'
									/>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue='process' className='w-full'>
				<TabsList className='grid w-full grid-cols-3'>
					<TabsTrigger value='process'>
						Processo de Produção
					</TabsTrigger>
					<TabsTrigger value='details'>
						Detalhes por Etapa
					</TabsTrigger>
					<TabsTrigger value='vineyard'>
						Informações do Vinhedo
					</TabsTrigger>
				</TabsList>

				<TabsContent value='process' className='mt-6'>
					<Card>
						<CardHeader>
							<CardTitle>Fluxo de Produção</CardTitle>
						</CardHeader>
						<CardContent>
							<ProcessFlow
								stages={data.stages}
								currentStage={data.currentStage}
							/>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='details' className='mt-6'>
					<div className='space-y-4'>
						{data.stages.map((stage) => (
							<StageDetails key={stage.id} stage={stage} />
						))}
					</div>
				</TabsContent>

				<TabsContent value='vineyard' className='mt-6'>
					<Card>
						<CardHeader>
							<CardTitle>Informações do Vinhedo</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<h3 className='font-semibold mb-3'>
										Localização
									</h3>
									<div className='space-y-2 text-sm'>
										<div className='flex justify-between'>
											<span className='text-muted-foreground'>
												Nome:
											</span>
											<span className='font-medium'>
												{data.vineyard.name}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-muted-foreground'>
												Localização:
											</span>
											<span className='font-medium'>
												{data.vineyard.location}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-muted-foreground'>
												Área:
											</span>
											<span className='font-medium'>
												{data.vineyard.area}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-muted-foreground'>
												Tipo de Solo:
											</span>
											<span className='font-medium'>
												{data.vineyard.soilType}
											</span>
										</div>
									</div>
								</div>

								<div>
									<h3 className='font-semibold mb-3'>
										Condições Climáticas
									</h3>
									<div className='space-y-2 text-sm'>
										<div className='flex justify-between'>
											<span className='text-muted-foreground'>
												Temperatura:
											</span>
											<span className='font-medium'>
												Monitoramento contínuo
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-muted-foreground'>
												Precipitação:
											</span>
											<span className='font-medium'>
												Distribuição adequada
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-muted-foreground'>
												Umidade:
											</span>
											<span className='font-medium'>
												Níveis controlados
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-muted-foreground'>
												Exposição Solar:
											</span>
											<span className='font-medium'>
												Orientação ideal
											</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

interface Tank {
	id: number;
	status: 'em-uso' | 'livre' | 'manutencao';
	content?: string;
	volume?: number;
	capacity: number;
	temperature?: number;
	pressure?: number;
	ph?: number;
	grapeType?: string;
	lastCleaning?: string;
	lastFilling?: string;
	history: Array<{
		date: string;
		action: string;
		details?: string;
	}>;
}

export default WineTraceability;
