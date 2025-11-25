import { JwtPayload } from 'jwt-decode';

export interface DecodedToken extends JwtPayload {
	id?: number;
	role?: string;
	sub?: string;
}
