import { SidebarInset, SidebarProvider } from '@/components';
import SessionProvider from '@/features/core/providers/sessionProvider';
import { AppSidebar } from '@/features/dashboard';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<SessionProvider>
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>{children}</SidebarInset>
				</SidebarProvider>
			</SessionProvider>
		</div>
	);
}
