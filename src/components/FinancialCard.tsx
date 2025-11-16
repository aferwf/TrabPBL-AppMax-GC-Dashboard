import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface FinancialCardProps {
  revenue: number;
  cost: number;
  margin: number;
}

export const FinancialCard = ({ revenue, cost, margin }: FinancialCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <DollarSign className="w-4 h-4 text-appmax-primary" />
          Resumo Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Receita Total</p>
            <p className="text-xl font-bold text-foreground">
              R$ {revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div>
            <p className="text-xs text-muted-foreground mb-1">Custo Total</p>
            <p className="text-xl font-bold text-foreground">
              R$ {cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Margem de Lucro</span>
            <span className="text-xl font-bold text-appmax-primary">
              {margin.toFixed(1)}%
            </span>
          </div>
          
          <div className="mt-2 h-2 bg-appmax-light-5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-appmax-primary rounded-full transition-all duration-500"
              style={{ width: `${margin}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
