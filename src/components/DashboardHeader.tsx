import { ExternalLink } from "lucide-react";
import appmaxLogo from "@/assets/appmax-logo-white.png";

interface DashboardHeaderProps {
  lastUpdate?: string;
}

export const DashboardHeader = ({ lastUpdate }: DashboardHeaderProps) => {
  const handleOpenSheet = () => {
    window.open('https://docs.google.com/spreadsheets/d/1B9D5E8p6gRZ6KlsTiJ-fAidfs5PopgJV/edit?usp=sharing&ouid=104334960109329441217&rtpof=true&sd=true', '_blank');
  };

  return (
    <header className="bg-appmax-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={appmaxLogo} alt="Appmax" className="h-5" />
            <div>
              <h1 className="text-lg md:text-xl font-bold">
                Sistema de Rastreamento WhatsApp
              </h1>
              {lastUpdate && (
                <p className="text-primary-foreground/60 text-xs">
                  Última atualização: {lastUpdate}
                </p>
              )}
            </div>
          </div>
          
          <button 
            onClick={handleOpenSheet}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Planilha</span>
          </button>
        </div>
      </div>
    </header>
  );
};
