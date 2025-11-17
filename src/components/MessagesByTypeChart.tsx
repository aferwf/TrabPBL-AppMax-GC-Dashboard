import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface MessagesByTypeChartProps {
  mensagensCodigoRastreio: number;
  mensagensSaidaEntrega: number;
  mensagensPedidoEntrega: number;
}

const chartConfig = {
  codigoRastreio: {
    label: "Código de Rastreio",
    color: "hsl(var(--appmax-primary))",
  },
  saidaEntrega: {
    label: "Saída p/ Entrega",
    color: "hsl(var(--appmax-light-1))",
  },
  pedidoEntregue: {
    label: "Pedido Entregue",
    color: "hsl(var(--appmax-cyan-1))",
  },
} satisfies Record<string, { label: string; color: string }>;

export const MessagesByTypeChart = ({ 
  mensagensCodigoRastreio, 
  mensagensSaidaEntrega, 
  mensagensPedidoEntrega 
}: MessagesByTypeChartProps) => {
  const chartData = [
    { 
      name: "Código de Rastreio",
      value: mensagensCodigoRastreio, 
      fill: "hsl(var(--appmax-primary))" 
    },
    { 
      name: "Saída p/ Entrega",
      value: mensagensSaidaEntrega, 
      fill: "hsl(var(--appmax-light-1))" 
    },
    { 
      name: "Pedido Entregue",
      value: mensagensPedidoEntrega, 
      fill: "hsl(var(--appmax-cyan-1))" 
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Send className="w-4 h-4 text-appmax-primary" />
          Mensagens Enviadas por Tipo
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer 
  config={chartConfig} 
  className="w-full"
>
  <div className="w-full h-[260px] sm:h-[280px] md:h-[300px]">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={false}
                outerRadius="55%"
                innerRadius="38%"
                fill="hsl(var(--appmax-primary))"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Legend 
                verticalAlign="bottom"
                height={60}
                iconType="circle"
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => <span className="text-xs sm:text-sm text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};