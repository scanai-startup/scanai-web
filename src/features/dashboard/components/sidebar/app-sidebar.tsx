'use client';

import * as React from 'react';
import {
	Command,
	LifeBuoy,
	PieChart,
	Send,
	SquareTerminal,
	Truck,
	Wine,
} from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavProjects } from './nav-projects';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';
import { LogoutButton } from '@/features/auth';

const data = {
	user: {
		name: 'Cauã Tavares',
		email: 'tavarescauac@gmail.com',
		avatar: '/avatars/shadcn.jpg',
	},
	navMain: [
		{
			title: 'Playground',
			url: '#',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'History',
					url: '#',
				},
				{
					title: 'Starred',
					url: '#',
				},
				{
					title: 'Settings',
					url: '#',
				},
			],
		},
	],
	navSecondary: [
		{
			title: 'Support',
			url: '#',
			icon: LifeBuoy,
		},
		{
			title: 'Feedback',
			url: '#',
			icon: Send,
		},
	],
	projects: [
		{
			name: 'Visão Geral',
			url: '/dashboard',
			icon: PieChart,
		},
		{
			name: 'Gestão de remessas',
			url: '/dashboard/remessas',
			icon: Truck,
		},
		{
			name: 'Rastreabilidade',
			url: '/dashboard/traceability',
			icon: Wine,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant='inset' {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg' asChild>
							<a href='#'>
								<div className='bg-red-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
									<Command className='size-4' />
								</div>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>
										Rio Sol
									</span>
									<span className='truncate text-xs'>
										Empresa
									</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{/* <NavMain items={data.navMain} /> */}
				<NavProjects projects={data.projects} />
				<NavSecondary items={data.navSecondary} className='mt-auto' />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
				<div className='px-2 py-1'>
					<LogoutButton />
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
