"use client";

export type Tank = {
  id: number;
  nome: string;
  volumeAtual: number;
  capacidadeTotal: number;
  status: "EM_USO" | "DISPONIVEL" | "MANUTENCAO";
  tipo: string;
};

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const getStatusLabel = (status: Tank["status"]) => {
  switch (status) {
    case "EM_USO":
      return "Em uso";
    case "DISPONIVEL":
      return "Disponível";
    case "MANUTENCAO":
      return "Manutenção";
  }
};

export const tankColumns: ColumnDef<Tank>[] = [
  {
    accessorKey: "nome",
    header: "Tanque",
    cell: ({ row }) => (
      <span className="font-semibold">{row.getValue("nome")}</span>
    ),
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "volumeAtual",
    header: "Volume Atual",
    cell: ({ row }) => <span>{row.getValue("volumeAtual")} L</span>,
  },
  {
    accessorKey: "capacidadeTotal",
    header: "Capacidade",
    cell: ({ row }) => <span>{row.getValue("capacidadeTotal")} L</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Tank["status"];
      const label = getStatusLabel(status);
      const color =
        status === "EM_USO"
          ? "text-blue-600"
          : status === "DISPONIVEL"
          ? "text-green-600"
          : "text-yellow-600";
      return <span className={`font-medium ${color}`}>{label}</span>;
    },
  },
  {
    id: "verMais",
    header: "",
    cell: ({ row }) => {
      const tank = row.original;
      const isMobile = useIsMobile();
      const [open, setOpen] = useState(false);

      return (
        <Drawer
          open={open}
          onOpenChange={setOpen}
          direction={isMobile ? "bottom" : "right"}
        >
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">
              Ver mais
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Detalhes do tanque: {tank.nome}</DrawerTitle>
              <DrawerDescription>
                Status atual e histórico de operação
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Tipo:</span> {tank.tipo}
                </div>
                <div>
                  <span className="font-medium">Capacidade:</span>{" "}
                  {tank.capacidadeTotal} L
                </div>
                <div>
                  <span className="font-medium">Volume Atual:</span>{" "}
                  {tank.volumeAtual} L
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  {getStatusLabel(tank.status)}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Histórico</h4>
                <div className="border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Volume</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { date: "01/07/2025", status: "EM_USO", volume: 3000 },
                        { date: "15/07/2025", status: "MANUTENCAO", volume: 0 },
                      ].map((entry, i) => (
                        <TableRow key={i}>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>
                            {getStatusLabel(entry.status as Tank["status"])}
                          </TableCell>
                          <TableCell>{entry.volume} L</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    },
  },
];
