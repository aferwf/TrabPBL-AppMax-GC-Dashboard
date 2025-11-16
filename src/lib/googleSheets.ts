import Papa from 'papaparse';

/**
 * Google Sheets Integration Configuration
 * 
 * HOW TO USE:
 * 1. Make sure your Google Sheet is published to the web (File -> Share -> Publish to web)
 * 2. The sheet should have the following columns:
 * - Cliente, NovoCliente(1/0), CodigosRastreioEnviados, TaxaSucesso(%), TaxaLeitura(%)
 * - ReducaoSuporte(%), Cliques, Lidas, NaoLidas, Msg_CodigoRastreio, Msg_SaidaEntrega
 * - Msg_PedidoEntregue, ReceitaTotal(R$), CustoTotal(R$), MargemLucro(%), TotalMensagensEnviadas
 */

// Extract the Sheet ID and convert to CSV export URL
const SHEET_ID = "1gY6MkoUVgDj9KDKUgULgsa5PpucNDWZI";
export const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

interface SheetRow {
  Cliente: string;
  'NovoCliente(1/0)': string;
  CodigosRastreioEnviados: string;
  'TaxaSucesso(%)': string;
  'TaxaLeitura(%)': string;
  'ReducaoSuporte(%)': string;
  Cliques: string;
  Lidas: string;
  NaoLidas: string;
  Msg_CodigoRastreio: string;
  Msg_SaidaEntrega: string;
  Msg_PedidoEntregue: string;
  'ReceitaTotal(R$)': string;
  'CustoTotal(R$)': string;
  'MargemLucro(%)': string;
  TotalMensagensEnviadas: string;
}

export interface DashboardData {
  activeClients: number;
  newClients: number;
  totalCodesSent: number;
  successRate: number;
  readRate: number;
  clickRate: number;
  revenue: number;
  cost: number;
  ticketReduction: number;
  mensagensPedidoEntrega: number;
  mensagensSaidaEntrega: number;
  mensagensCodigoRastreio: number;
  volumeData: Array<{ date: string; volume: number }>;
  successData: Array<{ date: string; success: number; failed: number }>;
  messageTypeData: Array<{ type: string; delivered: number }>;
  topClients: Array<{ name: string; messagesSent: number; revenue: number }>;
  lastUpdate: string;
}

// Helper function to parse numeric values from the sheet (Brazilian format)
const parseNumber = (value: string): number => {
  if (!value || value === '') return 0;
  // Remove R$, currency symbols and spaces
  // Remove dots (thousand separator in Brazilian format)
  // Replace comma with dot (decimal separator in Brazilian format)
  const cleaned = value.toString().replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

// Fetch and parse data from Google Sheets
export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    console.log('🔄 Fetching data from Google Sheets...');
    
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    const csvText = await response.text();
    
    const { data } = Papa.parse<SheetRow>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    console.log('📊 Parsed data rows:', data.length);
    console.log('📊 Sample row:', data[0]);
    console.log('📊 Column names:', Object.keys(data[0] || {}));

    // Aggregate data from all clients
    const uniqueClients = new Set<string>();
    let newClientsCount = 0;
    let totalCodesSent = 0;
    let totalSuccess = 0;
    let totalRead = 0;
    let totalClicks = 0;
    let totalRevenue = 0;
    let totalCost = 0;
    let totalTicketReduction = 0;
    let totalMsgCodigoRastreio = 0;
    let totalMsgSaidaEntrega = 0;
    let totalMsgPedidoEntregue = 0;
    let totalMessages = 0;

    // Group data by client for revenue ranking
    const clientRevenue = new Map<string, { messagesSent: number; revenue: number }>();

    const validRows = data.filter(row => row.Cliente && row.Cliente.trim() !== '');
    
    validRows.forEach(row => {
      uniqueClients.add(row.Cliente);
      
      // Check if this is a new client
      const isNewClient = row['NovoCliente(1/0)'] === '1';
      if (isNewClient) {
        newClientsCount++;
      }
      
      const codesSent = parseNumber(row.CodigosRastreioEnviados);
      const messagesSent = parseNumber(row.TotalMensagensEnviadas);
      const messagesRead = parseNumber(row.Lidas);
      const clicks = parseNumber(row.Cliques);
      const revenue = parseNumber(row['ReceitaTotal(R$)']);
      
      totalCodesSent += codesSent;
      totalSuccess += parseNumber(row['TaxaSucesso(%)']) * codesSent;
      totalRead += messagesRead;
      totalClicks += clicks;
      totalRevenue += revenue;
      totalCost += parseNumber(row['CustoTotal(R$)']);
      totalTicketReduction += parseNumber(row['ReducaoSuporte(%)']);
      totalMsgCodigoRastreio += parseNumber(row.Msg_CodigoRastreio);
      totalMsgSaidaEntrega += parseNumber(row.Msg_SaidaEntrega);
      totalMsgPedidoEntregue += parseNumber(row.Msg_PedidoEntregue);
      totalMessages += messagesSent;

      // Aggregate by client
      const current = clientRevenue.get(row.Cliente) || { messagesSent: 0, revenue: 0 };
      clientRevenue.set(row.Cliente, {
        messagesSent: current.messagesSent + messagesSent,
        revenue: current.revenue + revenue,
      });
    });

    const totalClients = uniqueClients.size;
    const rowCount = validRows.length;

    // Calculate averages
    const avgSuccessRate = totalCodesSent > 0 ? totalSuccess / totalCodesSent : 0;
    const avgReadRate = totalMessages > 0 ? (totalRead / totalMessages) * 100 : 0;
    const avgClickRate = totalMessages > 0 ? (totalClicks / totalMessages) * 100 : 0;
    const avgTicketReduction = rowCount > 0 ? totalTicketReduction / rowCount : 0;

    // Prepare top clients data
    const topClients = Array.from(clientRevenue.entries())
      .map(([name, data]) => ({
        name,
        messagesSent: data.messagesSent,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3);

    console.log('✅ Data aggregated successfully');
    console.log('📊 Top Clients:', topClients);
    console.log('📊 Total Revenue:', totalRevenue);
    console.log('📊 Total Cost:', totalCost);

    return {
      activeClients: totalClients,
      newClients: newClientsCount,
      totalCodesSent: totalCodesSent,
      successRate: parseFloat(avgSuccessRate.toFixed(1)),
      readRate: parseFloat(avgReadRate.toFixed(1)),
      clickRate: parseFloat(avgClickRate.toFixed(1)),
      revenue: totalRevenue,
      cost: totalCost,
      ticketReduction: parseFloat(avgTicketReduction.toFixed(1)),
      mensagensPedidoEntrega: totalMsgPedidoEntregue,
      mensagensSaidaEntrega: totalMsgSaidaEntrega,
      mensagensCodigoRastreio: totalMsgCodigoRastreio,
      volumeData: [],
      successData: [],
      messageTypeData: [
        { type: "Pedido Entregue", delivered: totalMsgPedidoEntregue },
        { type: "Saiu para Entrega", delivered: totalMsgSaidaEntrega },
        { type: "Código de Rastreio", delivered: totalMsgCodigoRastreio },
      ],
      topClients: topClients,
      lastUpdate: new Date().toLocaleString('pt-BR'),
    };
  } catch (error) {
    console.error('❌ Error fetching Google Sheets data:', error);
    throw error;
  }
};
