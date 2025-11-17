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
  height={60}
  iconType="circle"
  wrapperStyle={{ paddingTop: "10px" }}
  formatter={(value) => {
    const configItem = chartConfig[value.toLowerCase()];
    return (
      <span className="text-xs sm:text-sm text-foreground">
        {configItem?.label ?? value}
      </span>
    );
  }}
/>

            </PieChart>
          </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
