import React from 'react';
import { Service } from '../types/contract';

interface FinancialSummaryProps {
  services: Service[];
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({ services }) => {
  const subtotal = services.reduce((sum, service) => sum + service.value, 0);
  const totalDiscount = services.reduce((sum, service) => sum + service.discount, 0);
  const total = subtotal - totalDiscount;

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Resumo Financeiro</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold">
            R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total de Descontos:</span>
          <span className="font-semibold text-red-600">
            - R$ {totalDiscount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
        
        <hr className="border-gray-300" />
        
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span className="text-blue-600">
            R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};