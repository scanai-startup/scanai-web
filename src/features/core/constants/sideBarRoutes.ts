import { PieChart, Barrel, Truck, Wine, LifeBuoy, Send } from 'lucide-react';
import { Role } from './roles';

const routes = [
	{
		name: 'Visão Geral',
		url: '/app/dashboard',
		icon: PieChart,
	},
	{
		name: 'Gestão de tanques',
		url: '/app/dashboard/tanks',
		icon: Barrel,
	},
	{
		name: 'Gestão de remessas',
		url: '#',
		icon: Truck,
	},
	{
		name: 'Rastreabilidade',
		url: '/app/dashboard/traceability',
		icon: Wine,
	},
];

export const generalRoutes = [
	{
		title: 'Suporte',
		url: '#',
		icon: LifeBuoy,
	},
	{
		title: 'Fale conosco',
		url: '#',
		icon: Send,
	},
];

//! Coloquei esse resolver caso precise filtrar as rotas da sidebar pela role
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function routesResolver(role?: Role) {
	return routes;
}
