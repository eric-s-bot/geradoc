import React from 'react';
import { ContractData } from '../types/contract';

interface ClientFormProps {
  data: ContractData;
  onDataChange: (data: ContractData) => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ data, onDataChange }) => {
  const updateField = (field: keyof ContractData, value: any) => {
    onDataChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Dados do Cliente</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo *
          </label>
          <input
            type="text"
            value={data.clientName}
            onChange={(e) => updateField('clientName', e.target.value)}
            placeholder="Nome do cliente"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CPF/CNPJ *
          </label>
          <input
            type="text"
            value={data.clientDocument}
            onChange={(e) => updateField('clientDocument', e.target.value)}
            placeholder="000.000.000-00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço
          </label>
          <input
            type="text"
            value={data.clientAddress}
            onChange={(e) => updateField('clientAddress', e.target.value)}
            placeholder="Endereço completo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone *
          </label>
          <input
            type="tel"
            value={data.clientPhone}
            onChange={(e) => updateField('clientPhone', e.target.value)}
            placeholder="(00) 00000-0000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            value={data.clientEmail}
            onChange={(e) => updateField('clientEmail', e.target.value)}
            placeholder="cliente@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};