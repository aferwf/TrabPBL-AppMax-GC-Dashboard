import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, TrendingUp } from "lucide-react";

interface TopClientsRankingProps {
  clients: Array<{
    name: string;
    messagesSent: number;
    revenue: number;
  }>;
}

export const TopClientsRanking = ({ clients }: TopClientsRankingProps) => {
  const medals = ["1", "2", "3"];
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Trophy className="w-4 h-4 text-appmax-primary" />
          Top 3 Clientes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {clients.map((client, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-appmax-primary">{medals[index]}º</span>
              <div>
                <p className="font-semibold text-sm">{client.name}</p>
                <p className="text-xs text-muted-foreground">
                  {client.messagesSent.toLocaleString('pt-BR')} mensagens
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm text-appmax-primary">
                R$ {client.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                Receita
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
