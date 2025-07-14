import { SidebarInset, SidebarProvider } from "@/components";
import { AppSidebar } from "@/features/dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
