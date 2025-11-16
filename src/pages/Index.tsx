import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { KPICard } from "@/components/KPICard";
import { EngagementChart } from "@/components/EngagementChart";
import { FinancialCard } from "@/components/FinancialCard";
import { MessagesByTypeChart } from "@/components/MessagesByTypeChart";
import { TopClientsRanking } from "@/components/TopClientsRanking";
import { fetchDashboardData, DashboardData } from "@/lib/googleSheets";
import { 
  Users, 
  Send, 
  CheckCircle, 
  Eye, 
  MousePointer, 
  TrendingDown,
  UserPlus 
} from "lucide-react";

const Index = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // Refresh data every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-appmax-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <DashboardHeader lastUpdate={data.lastUpdate} />
      
      <main className="container mx-auto px-4 py-4 space-y-4">
        {/* KPI Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <KPICard
            title="Clientes Ativos"
            value={data.activeClients}
            subtitle={`+${data.newClients} novos este mês`}
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
          />
          
          <KPICard
            title="Códigos Enviados"
            value={data.totalCodesSent.toLocaleString('pt-BR')}
            subtitle="Total acumulado"
            icon={Send}
            trend={{ value: 8.3, isPositive: true }}
          />
          
          <KPICard
            title="Taxa de Sucesso"
            value={`${data.successRate}%`}
            subtitle="Entregas bem-sucedidas"
            icon={CheckCircle}
            trend={{ value: 2.1, isPositive: true }}
          />
          
          <KPICard
            title="Taxa de Leitura"
            value={`${data.readRate}%`}
            subtitle="Mensagens visualizadas"
            icon={Eye}
            trend={{ value: 5.4, isPositive: true }}
          />
        </section>

        {/* Secondary KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <KPICard
            title="Redução de Acionamentos de Suporte"
            value={`${data.ticketReduction}%`}
            subtitle="Menos consultas de rastreio"
            icon={TrendingDown}
            trend={{ value: 15.8, isPositive: true }}
          />
          
          <KPICard
            title="Novos Clientes"
            value={data.newClients}
            subtitle="Este mês"
            icon={UserPlus}
            trend={{ value: 25.0, isPositive: true }}
          />
        </section>

        {/* Engagement and Messages Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <EngagementChart 
            readRate={data.readRate}
            clickRate={data.clickRate}
            unopenedRate={100 - data.readRate}
          />
          
          <MessagesByTypeChart 
            mensagensCodigoRastreio={data.mensagensCodigoRastreio}
            mensagensSaidaEntrega={data.mensagensSaidaEntrega}
            mensagensPedidoEntrega={data.mensagensPedidoEntrega}
          />
        </section>

        {/* Financial Summary and Top Clients */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <FinancialCard
            revenue={data.revenue}
            cost={data.cost}
            margin={((data.revenue - data.cost) / data.revenue) * 100}
          />
          
          <TopClientsRanking clients={data.topClients} />
        </section>

      </main>
    </div>
  );
};

export default Index;
