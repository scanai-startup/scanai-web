import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  AppSidebar,
  ChartBarInteractive,
  DataTable,
} from "@/features/dashboard";
import data from "./data.json";
import WineProductionSidebar from "@/features/dashboard/components/sidebar/wine-production-sidebar";
import WineProductionCard from "@/features/dashboard/components/sidebar/wine-production-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Funcionalidades Principais
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Visão Geral</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div
            className="grid gap-4
             grid-cols-1
             md:grid-cols-[1fr_minmax(0,300px)]"
          >
            {/* Gráfico ocupa todo o espaço disponível */}
            <div className="bg-muted/50 rounded-xl">
              <ChartBarInteractive />
            </div>

            {/* Card de notas com largura fixa de até 300px */}
            <div className="bg-muted/50 rounded-xl">
              <WineProductionCard />
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl">
            <DataTable data={data} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
