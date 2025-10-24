const roles = {
	ADMIN: {
		fancy: 'Administrador',
	},
};

export type Role = keyof typeof roles;

export function fancyRoleName(identifier: keyof typeof roles) {
	return roles[identifier].fancy;
}
