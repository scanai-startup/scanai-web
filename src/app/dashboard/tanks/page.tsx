"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, DollarSign, Users, Warehouse } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Syrah", value: 35, color: "#facc15" }, // amarelo
  { name: "Cabernet", value: 25, color: "#3b82f6" }, // azul
  { name: "Merlot", value: 20, color: "#10b981" }, // verde
  { name: "Rosé", value: 15, color: "#a855f7" }, // roxo
  { name: "Outros", value: 5, color: "#6b7280" }, // cinza
];

export default function Tanks() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Gestão de Tanques
          </h2>
          <p className="text-muted-foreground">
            Acompanhe o desempenho e o uso dos tanques.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Exportar</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Produção mensal
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 87.340</div>
                <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertas</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">últimos 7 dias</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">ativos este mês</p>
              </CardContent>
            </Card> */}

            <div>
              <Card className="h-60">
                <CardHeader className="pb-2">
                  <CardTitle>Ocupação média</CardTitle>
                  <CardDescription>
                    Baseado no volume de enchimento
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center h-full space-y-2">
                  <div className="text-4xl font-bold">74%</div>
                  <p className="text-sm text-muted-foreground">
                    dos tanques estão com vinho
                  </p>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600"
                      style={{ width: "74%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="max-h-56">
              <TankStatusCard />
            </div>
            <div className="max-h-56">
              <WineSummaryCard />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento em tempo real</CardTitle>
              <CardDescription>
                Dados ao vivo dos sensores dos tanques.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Em breve...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function TankStatusCard() {
  const inUse = 10;
  const available = 6;
  const maintenance = 3;
  const total = inUse + available + maintenance;

  const getPercent = (value: number) => (value / total) * 100;

  return (
    <Card className="h-60">
      <CardHeader className="pb-2">
        <CardTitle>Tanques</CardTitle>
        <CardDescription>Status geral dos tanques</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold">{total}</span>
        </div>

        <div className="flex w-full gap-1 h-2 overflow-hidden rounded-full">
          <div
            className="bg-blue-500"
            style={{ width: `${getPercent(inUse)}%` }}
          />
          <div
            className="bg-green-500"
            style={{ width: `${getPercent(available)}%` }}
          />
          <div
            className="bg-yellow-500"
            style={{ width: `${getPercent(maintenance)}%` }}
          />
        </div>

        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
              Em uso
            </span>
            <span>{inUse} tanques</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              Disponíveis
            </span>
            <span>{available} tanques</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-500" />
              Em manutenção
            </span>
            <span>{maintenance} tanques</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WineSummaryCard() {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="h-60">
      <CardHeader className="pb-2">
        <CardTitle>Resumo de vinhos nos tanques</CardTitle>
        <CardDescription>Dados de 1 a 15 de Julho, 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between h-full">
        <div className="relative w-28 h-28">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={35}
                outerRadius={50}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: "0.75rem", borderRadius: "0.375rem" }}
                formatter={(value, name) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
            {total}L
          </div>
        </div>

        <div className="space-y-1 pl-4 text-xs w-44">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
