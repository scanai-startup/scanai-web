const roles = {
	ADMIN: {
		fancy: 'Administrador',
	},
	FUNCIONARIO: {
		fancy: 'Funcionário',
	},
};

export type Role = keyof typeof roles;

export function fancyRoleName(identifier: keyof typeof roles) {
	return roles[identifier]?.fancy;
}
