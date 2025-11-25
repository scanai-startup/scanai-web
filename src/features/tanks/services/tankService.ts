'use server';

import { TankWithDetails } from '../types/tankWithDetails';
import { apiService } from '@/features/core/services/apiService';

export const getTanksWithData = async (): Promise<TankWithDetails[]> => {
	try {
		const data = await apiService(
			'/deposito/getAllDepositosWithInformations',
			{
				method: 'GET',
			}
		);

		return data as TankWithDetails[];
	} catch (error) {
		console.error('Erro ao buscar os dados dos tanques: ', error);
		throw error;
	}
};

export const getTankData = async (id: string): Promise<TankWithDetails> => {
	try {
		const data = await apiService(
			`/deposito/getDepositoWithIdWithInformations/${id}`,
			{
				method: 'GET',
			}
		);

		return data as TankWithDetails;
	} catch (error) {
		console.error('Erro ao buscar os dados do tanque. ', error);
		throw error;
	}
};
