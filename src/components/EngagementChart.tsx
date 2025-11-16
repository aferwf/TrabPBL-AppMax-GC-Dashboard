import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface EngagementChartProps {
  readRate: number;
  clickRate: number;
  unopenedRate: number;
}

const chartConfig = {
  read: {
    label: "Lidas",
    color: "hsl(var(--appmax-primary))",
  },
  click: {
    label: "Cliques",
    color: "hsl(var(--appmax-cyan-1))",
  },
  unopened: {
    label: "Não Abertas",
    color: "hsl(var(--appmax-gray-2))",
  },
};

export const EngagementChart = ({ readRate, clickRate, unopenedRate }: EngagementChartProps) => {
  const chartData = [
    { name: "Lidas", value: readRate, fill: "hsl(var(--appmax-primary))" },
    { name: "Cliques", value: clickRate, fill: "hsl(var(--appmax-cyan-1))" },
    { name: "Não Abertas", value: unopenedRate, fill: "hsl(var(--appmax-gray-2))" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Eye className="w-4 h-4 text-appmax-primary" />
          Engajamento das Mensagens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[240px] md:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                outerRadius="70%"
                fill="hsl(var(--appmax-primary))"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend 
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
