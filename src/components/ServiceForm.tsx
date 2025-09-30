import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Service } from '../types/contract';

interface ServiceFormProps {
  services: Service[];
  onServicesChange: (services: Service[]) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ services, onServicesChange }) => {
  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      description: '',
      value: 0,
      discount: 0
    };
    onServicesChange([...services, newService]);
  };

  const removeService = (id: string) => {
    onServicesChange(services.filter(service => service.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: string | number) => {
    onServicesChange(
      services.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Serviços</h3>
        <button
          onClick={addService}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Adicionar Serviço
        </button>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          Nenhum serviço adicionado. Clique em "Adicionar Serviço" para começar.
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={service.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição do Serviço {index + 1}
                </label>
                <textarea
                  value={service.description}
                  onChange={(e) => updateService(service.id, 'description', e.target.value)}
                  placeholder="Descreva o serviço..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  value={service.value}
                  onChange={(e) => updateService(service.id, 'value', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desconto (R$)
                </label>
                <input
                  type="number"
                  value={service.discount}
                  onChange={(e) => updateService(service.id, 'discount', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                  max={service.value}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={() => removeService(service.id)}
                className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors justify-self-center"
                title="Remover serviço"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};