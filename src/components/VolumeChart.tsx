import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface VolumeChartProps {
  data: Array<{
    date: string;
    volume: number;
  }>;
}

const chartConfig = {
  volume: {
    label: "Códigos",
    color: "hsl(var(--appmax-light-2))",
  },
};

export const VolumeChart = ({ data }: VolumeChartProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="w-4 h-4 text-appmax-primary" />
          Volume de Códigos Enviados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] md:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -25, right: 5, top: 5, bottom: 5 }}>
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
              <Bar dataKey="volume" fill="hsl(var(--appmax-light-2))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
