import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const KPICard = ({ title, value, subtitle, icon: Icon, trend }: KPICardProps) => {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-appmax-light-5 rounded-lg">
            <Icon className="w-5 h-5 text-appmax-primary" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${
              trend.isPositive ? "text-appmax-primary" : "text-appmax-dark-3"
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-muted-foreground">
            {title}
          </h3>
          <p className="text-2xl font-bold text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
