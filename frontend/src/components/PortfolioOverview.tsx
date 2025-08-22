import type { PortfolioSummary } from '../types/portfolio';
import { BarChart3 } from 'lucide-react';

interface PortfolioOverviewProps {
  summary?: PortfolioSummary;
  isLoading?: boolean;
}

export const PortfolioOverview = ({ summary, isLoading }: PortfolioOverviewProps) => {
  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 h-64 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
          <div className="text-sm text-blue-600">Cargando resumen...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 h-56">
      <div className="p-4 border-b border-blue-200">
        <h3 className="text-base font-semibold text-gray-900">Mi Resumen</h3>
      </div>
      
      <div className="p-4 flex flex-col items-center justify-center h-40">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 border border-blue-300 flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-600 mb-1">Para empezar a operar dentro de la plataforma, necesitamos validar</p>
          <p className="text-xs text-gray-600 mb-3">y habilitar tu cuenta.</p>
          <button className="bg-blue-600 text-white px-6 py-2 text-sm font-medium hover:bg-blue-700">
            Verificar cuenta
          </button>
        </div>
      </div>
    </div>
  );
};