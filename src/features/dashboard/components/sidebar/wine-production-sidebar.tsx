"use client";

import * as React from "react";
import {
  IconSearch,
  IconLine,
  IconCalendar,
  IconFileText,
  IconBarrel,
  IconGrave,
  IconBottle,
  IconFilter,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface NotaFiscal {
  id: string;
  numero: string;
  tipo: string;
  vinho: string;
  safra: string;
  quantidade: number;
  status: "Em Produção" | "Fermentação" | "Envelhecimento" | "Finalizado";
  dataInicio: string;
  dataPrevisao: string;
  responsavel: string;
  observacoes: string;
}

const mockNotasFiscais: NotaFiscal[] = [
  {
    id: "1",
    numero: "12347",
    tipo: "Produção",
    vinho: "Syrah",
    safra: "2025",
    quantidade: 5000,
    status: "Em Produção",
    dataInicio: "14/02/2025",
    dataPrevisao: "14/08/2025",
    responsavel: "João Silva",
    observacoes: "Safra de alta qualidade, uvas selecionadas da região sul.",
  },
  {
    id: "2",
    numero: "12348",
    tipo: "Produção",
    vinho: "Cabernet Sauvignon",
    safra: "2025",
    quantidade: 3500,
    status: "Fermentação",
    dataInicio: "10/02/2025",
    dataPrevisao: "10/09/2025",
    responsavel: "Maria Santos",
    observacoes: "Processo de fermentação controlada a 25°C.",
  },
  {
    id: "3",
    numero: "12349",
    tipo: "Produção",
    vinho: "Alicante Bouschet",
    safra: "2024",
    quantidade: 2800,
    status: "Envelhecimento",
    dataInicio: "15/08/2024",
    dataPrevisao: "15/02/2025",
    responsavel: "Pedro Costa",
    observacoes: "Envelhecimento em barris de carvalho francês.",
  },
  {
    id: "4",
    numero: "12350",
    tipo: "Produção",
    vinho: "Touriga Nacional",
    safra: "2024",
    quantidade: 4200,
    status: "Finalizado",
    dataInicio: "20/07/2024",
    dataPrevisao: "20/01/2025",
    responsavel: "Ana Oliveira",
    observacoes: "Lote finalizado com excelente qualidade.",
  },
];

const categorias = {
  "Vinhos Tintos": [
    "Cabernet Sauvignon",
    "Syrah",
    "Alicante Bouschet",
    "Touriga Nacional",
    "Aragonês",
    "Tempranillo",
  ],
  "Vinhos Brancos": [
    "Chardonnay",
    "Sauvignon Blanc",
    "Riesling",
    "Pinot Grigio",
  ],
};

function getStatusColor(status: NotaFiscal["status"]) {
  switch (status) {
    case "Em Produção":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Fermentação":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Envelhecimento":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "Finalizado":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

function getStatusIcon(status: NotaFiscal["status"]) {
  switch (status) {
    case "Em Produção":
      return <IconLine className="w-3 h-3" />;
    case "Fermentação":
      return <IconBarrel className="w-3 h-3" />;
    case "Envelhecimento":
      return <IconGrave className="w-3 h-3" />;
    case "Finalizado":
      return <IconBottle className="w-3 h-3" />;
    default:
      return <IconFileText className="w-3 h-3" />;
  }
}

function NotaFiscalCard({ nota }: { nota: NotaFiscal }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/traceability/${nota.id}`)}
      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <IconFileText className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">NF: {nota.numero}</span>
        </div>
        <Badge className={`text-xs ${getStatusColor(nota.status)}`}>
          {getStatusIcon(nota.status)}
          {nota.status}
        </Badge>
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <IconGrave className="w-3 h-3" />
          <span>
            {nota.vinho} – Safra {nota.safra}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IconCalendar className="w-3 h-3" />
          <span>{nota.dataInicio}</span>
        </div>
        <div className="text-xs">{nota.quantidade.toLocaleString()} litros</div>
      </div>
    </div>
  );
}

export default function WineProductionCard() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredNotas, setFilteredNotas] = React.useState(mockNotasFiscais);

  React.useEffect(() => {
    setFilteredNotas(
      mockNotasFiscais.filter(
        (n) =>
          n.numero.includes(searchTerm) ||
          n.vinho.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-xl p-4 w-full h-full flex flex-col max-h-[450px]">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar NF ou vinho..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <button
          className="p-2 border rounded-md hover:bg-muted transition-colors"
          aria-label="Filtros"
        >
          <IconFilter className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="space-y-3">
          {filteredNotas.length > 0 ? (
            filteredNotas.map((nota) => (
              <NotaFiscalCard key={nota.id} nota={nota} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Sem resultados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
