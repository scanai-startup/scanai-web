import {
  Separator,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components";
import {
  AppSidebar,
  ChartBarInteractive,
  DataTable,
} from "@/features/dashboard";
import data from "./data.json";
import { WineProductionCard } from "@/features/dashboard";
import TankOccupancy from "@/features/dashboard/components/chart/tank-ocuppancy";

export default function Page() {
  return (
    <>
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
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_400px]">
          <div className="bg-muted/50 rounded-xl flex flex-col gap-4 p-4 h-fit">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="w-full md:w-1/2">
                <ChartBarInteractive />
              </div>
              <div className="w-full md:w-1/2">
                <TankOccupancy />
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-1 h-full">
            <WineProductionCard />
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl">
          <DataTable data={data} />
        </div>
      </div>
    </>
  );
}
