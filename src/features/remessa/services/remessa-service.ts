import { Remessa } from '../types';
import { AuthService } from '../../auth/services/auth-service';

const API_BASE_URL = 'http://localhost:8080';

// Função para construir headers com autenticação
const getAuthHeaders = (): HeadersInit => {
	const token = AuthService.getToken();
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	return headers;
};

export class RemessaService {
	static async getAllRemessas(): Promise<Remessa[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/uva/getAll`, {
				method: 'GET',
				headers: getAuthHeaders(),
			});

			if (!response.ok) {
				if (response.status === 401) {
					AuthService.removeToken();
					throw new Error('Sessão expirada. Faça login novamente.');
				}
				if (response.status === 403) {
					throw new Error('Acesso negado - permissões insuficientes');
				}
				throw new Error(`Erro HTTP: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Erro ao buscar remessas:', error);
			throw error;
		}
	}

	static async getValidRemessas(): Promise<Remessa[]> {
		try {
			const response = await fetch(
				`${API_BASE_URL}/uva/getAllByValidTrue`,
				{
					method: 'GET',
					headers: getAuthHeaders(),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					AuthService.removeToken();
					throw new Error('Sessão expirada. Faça login novamente.');
				}
				if (response.status === 403) {
					throw new Error('Acesso negado - permissões insuficientes');
				}
				throw new Error(`Erro HTTP: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Erro ao buscar remessas válidas:', error);
			throw error;
		}
	}

	static async getRemessaById(id: number): Promise<Remessa> {
		try {
			const response = await fetch(
				`${API_BASE_URL}/uva/getElement/${id}`,
				{
					method: 'GET',
					headers: getAuthHeaders(),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					AuthService.removeToken();
					throw new Error('Sessão expirada. Faça login novamente.');
				}
				if (response.status === 403) {
					throw new Error('Acesso negado - permissões insuficientes');
				}
				throw new Error(`Erro HTTP: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Erro ao buscar remessa ${id}:`, error);
			throw error;
		}
	}
}
