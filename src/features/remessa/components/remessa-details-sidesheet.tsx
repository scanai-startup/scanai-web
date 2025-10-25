'use client';

import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Save, Truck, Plus, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { RemessaService } from '@/features/remessa';
import { Remessa } from '@/features/remessa/types';

interface RemessaDetailsForm {
	datachegada: string;
	numerotalao: string;
	casta: string;
	tipovinho: string;
	qttcaixa: number;
	peso: number;
	sanidade: number;
	so2: number;
	numerolote: string;
	observacoes: string;
}

interface RemessaDetailsSidesheetProps {
	remessa?: Remessa;
	onRemessaSaved?: () => void;
	mode?: 'create' | 'edit';
}

export function RemessaDetailsSidesheet({
	remessa,
	onRemessaSaved,
	mode = 'create',
}: RemessaDetailsSidesheetProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<RemessaDetailsForm>({
		datachegada:
			remessa?.datachegada || new Date().toISOString().split('T')[0],
		numerotalao: remessa?.numerotalao || '',
		casta: remessa?.casta || '',
		tipovinho: remessa?.tipovinho || '',
		qttcaixa: remessa?.qttcaixa || 0,
		peso: remessa?.peso || 0,
		sanidade: 0,
		so2: 0,
		numerolote: '',
		observacoes: '',
	});

	const handleInputChange = (
		field: keyof RemessaDetailsForm,
		value: string | number
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			if (mode === 'create') {
				await RemessaService.createRemessa({
					datachegada: formData.datachegada,
					numerotalao: formData.numerotalao,
					casta: formData.casta,
					tipovinho: formData.tipovinho,
					qttcaixa: formData.qttcaixa,
					peso: formData.peso,
					sanidade: formData.sanidade,
					so2: formData.so2,
					numerolote: formData.numerolote,
					valid: true,
				});
				toast.success('Remessa criada com sucesso!');
			} else if (remessa) {
				await RemessaService.updateRemessa(remessa.id, {
					datachegada: formData.datachegada,
					numerotalao: formData.numerotalao,
					casta: formData.casta,
					tipovinho: formData.tipovinho,
					qttcaixa: formData.qttcaixa,
					peso: formData.peso,
					sanidade: formData.sanidade,
					so2: formData.so2,
					numerolote: formData.numerolote,
					valid: true,
				});
				toast.success('Remessa atualizada com sucesso!');
			}

			setOpen(false);
			onRemessaSaved?.();
		} catch (error) {
			console.error('Erro ao salvar remessa:', error);
			toast.error('Erro ao salvar remessa. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	const triggerButton =
		mode === 'create' ? (
			<Button size='sm' className='flex items-center space-x-2'>
				<Plus className='h-4 w-4' />
				<span>Nova remessa</span>
			</Button>
		) : (
			<Button
				size='sm'
				variant='outline'
				className='flex items-center space-x-2'
			>
				<Edit className='h-4 w-4' />
				<span>Editar</span>
			</Button>
		);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{triggerButton}</SheetTrigger>
			<SheetContent className='w-[600px] sm:max-w-[600px]'>
				<SheetHeader>
					<SheetTitle className='flex items-center space-x-2'>
						<Truck className='h-5 w-5' />
						<span>
							{mode === 'create'
								? 'Nova Remessa'
								: 'Editar Remessa'}
						</span>
					</SheetTitle>
					<SheetDescription>
						{mode === 'create'
							? 'Cadastre uma nova remessa de uvas'
							: 'Edite os dados da remessa'}
					</SheetDescription>
				</SheetHeader>

				<form
					onSubmit={handleSubmit}
					className='flex-1 overflow-y-auto'
				>
					<div className='space-y-6 py-6'>
						{/* Informações Básicas */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>
									Informações Básicas
								</CardTitle>
								<CardDescription>
									Dados principais da remessa
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='datachegada'>
										Data de Chegada
									</Label>
									<Input
										id='datachegada'
										type='date'
										value={formData.datachegada}
										onChange={(e) =>
											handleInputChange(
												'datachegada',
												e.target.value
											)
										}
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='numerotalao'>
										Número do Talão
									</Label>
									<Input
										id='numerotalao'
										value={formData.numerotalao}
										onChange={(e) =>
											handleInputChange(
												'numerotalao',
												e.target.value
											)
										}
										placeholder='Ex: TAL-2024-001'
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='numerolote'>
										Número do Lote
									</Label>
									<Input
										id='numerolote'
										value={formData.numerolote}
										onChange={(e) =>
											handleInputChange(
												'numerolote',
												e.target.value
											)
										}
										placeholder='Ex: LOTE-2024-001'
										required
									/>
								</div>
							</CardContent>
						</Card>

						{/* Informações do Vinho */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>
									Informações do Vinho
								</CardTitle>
								<CardDescription>
									Características da uva e tipo de vinho
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='casta'>Casta</Label>
									<Select
										value={formData.casta}
										onValueChange={(value) =>
											handleInputChange('casta', value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder='Selecione a casta' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='Cabernet Sauvignon'>
												Cabernet Sauvignon
											</SelectItem>
											<SelectItem value='Merlot'>
												Merlot
											</SelectItem>
											<SelectItem value='Syrah'>
												Syrah
											</SelectItem>
											<SelectItem value='Chardonnay'>
												Chardonnay
											</SelectItem>
											<SelectItem value='Sauvignon Blanc'>
												Sauvignon Blanc
											</SelectItem>
											<SelectItem value='Pinot Noir'>
												Pinot Noir
											</SelectItem>
											<SelectItem value='Tempranillo'>
												Tempranillo
											</SelectItem>
											<SelectItem value='Malbec'>
												Malbec
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='tipovinho'>
										Tipo de Vinho
									</Label>
									<Select
										value={formData.tipovinho}
										onValueChange={(value) =>
											handleInputChange(
												'tipovinho',
												value
											)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder='Selecione o tipo' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='Tinto'>
												Tinto
											</SelectItem>
											<SelectItem value='Branco'>
												Branco
											</SelectItem>
											<SelectItem value='Rosé'>
												Rosé
											</SelectItem>
											<SelectItem value='Espumante'>
												Espumante
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						{/* Quantidades */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>
									Quantidades
								</CardTitle>
								<CardDescription>
									Volume e peso da remessa
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='qttcaixa'>
										Quantidade de Caixas
									</Label>
									<Input
										id='qttcaixa'
										type='number'
										min='0'
										value={formData.qttcaixa}
										onChange={(e) =>
											handleInputChange(
												'qttcaixa',
												parseInt(e.target.value) || 0
											)
										}
										placeholder='Ex: 100'
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='peso'>
										Peso Total (kg)
									</Label>
									<Input
										id='peso'
										type='number'
										min='0'
										step='0.1'
										value={formData.peso}
										onChange={(e) =>
											handleInputChange(
												'peso',
												parseFloat(e.target.value) || 0
											)
										}
										placeholder='Ex: 1500.5'
										required
									/>
								</div>
							</CardContent>
						</Card>

						{/* Análises */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>
									Análises de Qualidade
								</CardTitle>
								<CardDescription>
									Parâmetros de qualidade da uva
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='sanidade'>
										Sanidade (%)
									</Label>
									<Input
										id='sanidade'
										type='number'
										min='0'
										max='100'
										step='0.1'
										value={formData.sanidade}
										onChange={(e) =>
											handleInputChange(
												'sanidade',
												parseFloat(e.target.value) || 0
											)
										}
										placeholder='Ex: 95.5'
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='so2'>SO2 (mg/L)</Label>
									<Input
										id='so2'
										type='number'
										min='0'
										step='0.1'
										value={formData.so2}
										onChange={(e) =>
											handleInputChange(
												'so2',
												parseFloat(e.target.value) || 0
											)
										}
										placeholder='Ex: 25.0'
										required
									/>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>
									Observações
								</CardTitle>
								<CardDescription>
									Informações adicionais sobre a remessa
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-2'>
									<Label htmlFor='observacoes'>
										Observações
									</Label>
									<Textarea
										id='observacoes'
										value={formData.observacoes}
										onChange={(e) =>
											handleInputChange(
												'observacoes',
												e.target.value
											)
										}
										placeholder='Digite observações sobre a qualidade, origem, ou outras informações relevantes...'
										rows={4}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</form>

				<SheetFooter className='border-t pt-6'>
					<div className='flex justify-end space-x-4 w-full'>
						<Button
							type='button'
							variant='outline'
							onClick={() => setOpen(false)}
							disabled={loading}
						>
							Cancelar
						</Button>
						<Button
							type='submit'
							disabled={loading}
							className='flex items-center space-x-2'
							onClick={handleSubmit}
						>
							<Save className='h-4 w-4' />
							<span>
								{loading
									? 'Salvando...'
									: mode === 'create'
									? 'Salvar Remessa'
									: 'Atualizar Remessa'}
							</span>
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
