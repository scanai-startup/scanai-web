import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components";
import { Separator } from "@/components/ui/separator";
import { IconBarrel } from "@tabler/icons-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Tank {
  id: number;
  status: "em-uso" | "livre" | "manutencao";
  content?: string;
  volume?: number;
  capacity: number;
  temperature?: number;
  pressure?: number;
  ph?: number;
  grapeType?: string;
  lastCleaning?: string;
  lastFilling?: string;
  history: Array<{
    date: string;
    action: string;
    details?: string;
  }>;
}

const mockTanks: Tank[] = [
  {
    id: 1,
    status: "em-uso",
    content: "Chardonnay",
    volume: 4500,
    capacity: 5000,
    temperature: 15,
    pressure: 1.2,
    ph: 3.5,
    grapeType: "Chardonnay",
    lastCleaning: "2023-10-15",
    lastFilling: "2023-10-20",
    history: [
      {
        date: "2023-10-15",
        action: "Limpeza",
        details: "Limpeza completa do tanque",
      },
      {
        date: "2023-10-20",
        action: "Enchimento",
        details: "Enchimento com mosto de Chardonnay",
      },
      {
        date: "2023-11-01",
        action: "Análise",
        details: "Análise de fermentação - pH 3.5",
      },
    ],
  },
  {
    id: 2,
    status: "livre",
    capacity: 5000,
    lastCleaning: "2023-10-10",
    history: [
      {
        date: "2023-10-10",
        action: "Limpeza",
        details: "Preparação para próximo uso",
      },
    ],
  },
  {
    id: 3,
    status: "em-uso",
    content: "Syrah",
    volume: 4800,
    capacity: 5000,
    temperature: 18,
    pressure: 1.1,
    ph: 3.3,
    grapeType: "Syrah",
    lastFilling: "2023-10-18",
    history: [
      {
        date: "2023-10-18",
        action: "Enchimento",
        details: "Enchimento com mosto de Syrah",
      },
      {
        date: "2023-10-25",
        action: "Remontagem",
        details: "Primeira remontagem",
      },
    ],
  },
  {
    id: 4,
    status: "manutencao",
    capacity: 4500,
    lastCleaning: "2023-10-22",
    history: [
      {
        date: "2023-10-22",
        action: "Manutenção",
        details: "Manutenção preventiva do sistema de refrigeração",
      },
    ],
  },
  {
    id: 5,
    status: "livre",
    capacity: 3000,
    lastCleaning: "2023-10-12",
    history: [
      {
        date: "2023-10-12",
        action: "Limpeza",
        details: "Manutenção preventiva",
      },
    ],
  },
  {
    id: 6,
    status: "em-uso",
    content: "Merlot",
    volume: 2800,
    capacity: 3000,
    temperature: 17,
    pressure: 1.0,
    ph: 3.6,
    grapeType: "Merlot",
    lastFilling: "2023-10-25",
    history: [
      {
        date: "2023-10-25",
        action: "Enchimento",
        details: "Enchimento com mosto de Merlot",
      },
    ],
  },
];

export default function TankOccupancy() {
  function getTankColor(status: Tank["status"]) {
    switch (status) {
      case "em-uso":
        return "bg-green-600 hover:bg-green-700";
      case "livre":
        return "bg-gray-400 hover:bg-gray-500";
      case "manutencao":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-400 hover:bg-gray-500";
    }
  }

  function getStatusText(status: Tank["status"]) {
    switch (status) {
      case "em-uso":
        return "Em uso";
      case "livre":
        return "Livre";
      case "manutencao":
        return "Manutenção";
      default:
        return "Livre";
    }
  }

  function TankDetailContent({ tank }: { tank: Tank }) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge
            className={`${
              tank.status === "em-uso"
                ? "bg-green-100 text-green-800"
                : tank.status === "livre"
                ? "bg-gray-100 text-gray-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            Status: {getStatusText(tank.status)}
          </Badge>
          {tank.capacity && (
            <div className="text-sm text-muted-foreground">
              Capacidade: {tank.capacity.toLocaleString()} L
            </div>
          )}
        </div>

        <Separator />

        {tank.status === "em-uso" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    VOLUME ATUAL
                  </h4>
                  <div className="text-2xl font-bold text-blue-600">
                    {tank.volume?.toLocaleString()} L
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tank.volume && tank.capacity
                      ? Math.round((tank.volume / tank.capacity) * 100)
                      : 0}
                    % da capacidade
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    TIPO DE UVA
                  </h4>
                  <div className="text-lg font-medium">{tank.grapeType}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    TEMPERATURA
                  </h4>
                  <div className="text-2xl font-bold text-orange-600">
                    {tank.temperature}°C
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                      PRESSÃO
                    </h4>
                    <div className="text-lg font-medium">
                      {tank.pressure} atm
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                      pH
                    </h4>
                    <div className="text-lg font-medium">{tank.ph}</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
          </>
        )}

        <div>
          <h4 className="font-semibold text-lg mb-4">Histórico</h4>
          <div className="space-y-3">
            {tank.history.map((entry, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{entry.action}</span>
                    <span className="text-sm text-muted-foreground">
                      {entry.date}
                    </span>
                  </div>
                  {entry.details && (
                    <p className="text-sm text-muted-foreground">
                      {entry.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {tank.status === "em-uso" && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              {tank.lastCleaning && (
                <div>
                  <span className="text-muted-foreground">Última Limpeza:</span>
                  <div className="font-medium">{tank.lastCleaning}</div>
                </div>
              )}
              {tank.lastFilling && (
                <div>
                  <span className="text-muted-foreground">
                    Último Enchimento:
                  </span>
                  <div className="font-medium">{tank.lastFilling}</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm h-full">
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <IconBarrel className="w-4 h-4" />
            Ocupação de Tanques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {mockTanks.map((tank) => (
              <Drawer key={tank.id} direction="right">
                <DrawerTrigger asChild>
                  <button
                    className={`
                      aspect-square rounded-lg flex flex-col items-center justify-center text-white font-bold text-sm transition-colors cursor-pointer
                      ${getTankColor(tank.status)}
                    `}
                  >
                    <span className="text-lg">{tank.id}</span>
                    <span className="text-xs mt-1">
                      {getStatusText(tank.status)}
                    </span>
                  </button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[100vh] w-[600px] max-w-[90vw]">
                  <DrawerHeader>
                    <DrawerTitle className="flex items-center gap-2">
                      <IconBarrel className="w-5 h-5" />
                      Detalhes do Tanque {tank.id}
                    </DrawerTitle>
                    <DrawerDescription>
                      Informações detalhadas e histórico do tanque
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-6 pb-4 overflow-y-auto">
                    <TankDetailContent tank={tank} />
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Fechar</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>Em uso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span>Livre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Manutenção</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
