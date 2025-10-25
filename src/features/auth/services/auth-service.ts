const API_BASE_URL = 'http://localhost:8080';

// Interface para dados de login
interface LoginData {
	matricula: string;
	senha: string;
}

// Interface para resposta de login
interface LoginResponse {
	token: string;
}

export class AuthService {
	static async login(matricula: string, senha: string): Promise<string> {
		try {
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ matricula, senha }),
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Matrícula ou senha incorretos');
				}
				throw new Error(`Erro no login: ${response.status}`);
			}

			const data: LoginResponse = await response.json();
			return data.token;
		} catch (error) {
			console.error('Erro ao fazer login:', error);
			throw error;
		}
	}

	static saveToken(token: string): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem('authToken', token);
		}
	}

	static getToken(): string | null {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('authToken');
		}
		return null;
	}

	static removeToken(): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('authToken');
		}
	}

	static isAuthenticated(): boolean {
		return this.getToken() !== null;
	}
}
