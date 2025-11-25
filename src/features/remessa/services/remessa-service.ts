'use server';

import { Remessa } from '../types';
import { apiService } from '@/features/core/services/apiService';

export async function getAllRemessas(): Promise<Remessa[]> {
	try {
		return await apiService<Remessa[]>('/uva/getAll', {
			method: 'GET',
		});
	} catch (error) {
		console.error('Erro ao buscar remessas:', error);
		throw error;
	}
}

export async function getValidRemessas(): Promise<Remessa[]> {
	try {
		return await apiService<Remessa[]>('/uva/getAllByValidTrue', {
			method: 'GET',
		});
	} catch (error) {
		console.error('Erro ao buscar remessas válidas:', error);
		throw error;
	}
}

export async function getRemessaById(id: number): Promise<Remessa> {
	try {
		return await apiService<Remessa>(`/uva/getElement/${id}`, {
			method: 'GET',
		});
	} catch (error) {
		console.error(`Erro ao buscar remessa ${id}:`, error);
		throw error;
	}
}

export async function createRemessa(
	remessa: Omit<Remessa, 'id'>
): Promise<Remessa> {
	try {
		return await apiService<Remessa>('/uva/create', {
			method: 'POST',
			body: {
				...remessa,
				valid: true,
			},
		});
	} catch (error) {
		console.error('Erro ao criar remessa:', error);
		throw error;
	}
}

export async function updateRemessa(
	id: number,
	remessa: Partial<Remessa>
): Promise<Remessa> {
	try {
		return await apiService<Remessa>(`/uva/update/${id}`, {
			method: 'PUT',
			body: remessa,
		});
	} catch (error) {
		console.error(`Erro ao atualizar remessa ${id}:`, error);
		throw error;
	}
}

export async function deleteRemessa(id: number): Promise<void> {
	try {
		await apiService<void>(`/uva/delete/${id}`, {
			method: 'DELETE',
		});
	} catch (error) {
		console.error(`Erro ao excluir remessa ${id}:`, error);
		throw error;
	}
}
