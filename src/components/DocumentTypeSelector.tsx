import React from 'react';
import { FileText, Receipt } from 'lucide-react';

interface DocumentTypeSelectorProps {
  documentType: 'contract' | 'quote';
  onTypeChange: (type: 'contract' | 'quote') => void;
}

export const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  documentType,
  onTypeChange
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">Tipo de Documento</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onTypeChange('contract')}
          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
            documentType === 'contract'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <FileText size={24} />
          <div className="text-left">
            <div className="font-semibold">Contrato</div>
            <div className="text-sm opacity-75">Com termos e condições</div>
          </div>
        </button>
        
        <button
          onClick={() => onTypeChange('quote')}
          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
            documentType === 'quote'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Receipt size={24} />
          <div className="text-left">
            <div className="font-semibold">Orçamento</div>
            <div className="text-sm opacity-75">Apenas valores</div>
          </div>
        </button>
      </div>
    </div>
  );
};