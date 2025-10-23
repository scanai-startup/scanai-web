'use server';

import { fakeDepositsWithData } from '@/factories/depositDataFactory';
import { TankWithDetails } from '../types/tankWithDetails';

export const getTanksWithData = async (): Promise<TankWithDetails[]> => {
	try {
		//TODO: testar com retorno da API
		// const data = await apiService(
		// 	'/deposito/getAllDepositosWithInformations',
		// 	{
		// 		method: 'GET',
		// 	}
		// );

		return await new Promise<TankWithDetails[]>((resolve) => {
			setTimeout(() => resolve(fakeDepositsWithData), 3000);
		});
	} catch (error) {
		console.error('Erro ao buscar os dados dos tanques: ', error);
		throw error;
	}
};
