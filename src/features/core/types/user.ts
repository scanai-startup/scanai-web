import { Role } from '../constants/roles';

export interface User {
	id: number;
	name: string;
	role: Role;
}
