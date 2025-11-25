export interface Remessa {
	id: number;
	valid: boolean;
	datachegada: string;
	numerotalao: number;
	qttcaixa: number;
	sanidade: number;
	peso: number;
	so2: string;
	numerolote: number;
	tipovinho: string;
	casta: string;
	fkfuncionario: number;
	fkmostro: number | null;
}

export interface RemessaStats {
	totalRemessas: number;
	totalCaixas: number;
	pesoTotal: number;
	remessasAtivas: number;
	remessasInativas: number;
	tiposVinho: Record<string, number>;
}
