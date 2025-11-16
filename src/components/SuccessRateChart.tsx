import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface SuccessRateChartProps {
  data: Array<{
    date: string;
    success: number;
    failed: number;
  }>;
}

const chartConfig = {
  success: {
    label: "Sucesso",
    color: "hsl(var(--appmax-primary))",
  },
  failed: {
    label: "Falhas",
    color: "hsl(var(--appmax-dark-3))",
  },
};

export const SuccessRateChart = ({ data }: SuccessRateChartProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="w-4 h-4 text-appmax-primary" />
          Taxa de Sucesso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] md:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: -25, right: 5, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--appmax-gray-3))" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={9}
                angle={-65}
                textAnchor="end"
                height={70}
                interval={0}
                tick={{ fontSize: 9 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                width={35}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="success" 
                stroke="hsl(var(--appmax-primary))" 
                strokeWidth={2.5}
                dot={{ fill: "hsl(var(--appmax-primary))", r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="failed" 
                stroke="hsl(var(--appmax-dark-3))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--appmax-dark-3))", r: 2.5 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
