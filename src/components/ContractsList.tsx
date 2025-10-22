import React, { useState, useEffect } from 'react';
import { FileText, Receipt, Edit, Trash2, FileSignature, X, Calendar } from 'lucide-react';
import { SavedContract } from '../types/contract';
import { contractsDb } from '../lib/contractsDb';

interface ContractsListProps {
  userId: string;
  onLoadContract: (contract: SavedContract) => void;
  onConvertToContract: (contract: SavedContract) => void;
  onClose: () => void;
}

export const ContractsList: React.FC<ContractsListProps> = ({
  userId,
  onLoadContract,
  onConvertToContract,
  onClose,
}) => {
  const [contracts, setContracts] = useState<SavedContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'contract' | 'quote'>('all');

  useEffect(() => {
    loadContracts();
  }, [userId, filter]);

  const loadContracts = async () => {
    setLoading(true);
    const { data, error } = await contractsDb.listContracts(
      userId,
      filter === 'all' ? undefined : filter
    );

    if (error) {
      console.error('Erro ao carregar contratos:', error);
    } else if (data) {
      setContracts(data);
    }
    setLoading(false);
  };

  const handleDelete = async (contractId: string) => {
    if (!confirm('Tem certeza que deseja excluir este documento?')) {
      return;
    }

    const { error } = await contractsDb.deleteContract(contractId);
    if (error) {
      alert('Erro ao excluir documento. Tente novamente.');
    } else {
      loadContracts();
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { color: 'bg-gray-100 text-gray-700', text: 'Rascunho' },
      sent: { color: 'bg-blue-100 text-blue-700', text: 'Enviado' },
      accepted: { color: 'bg-green-100 text-green-700', text: 'Aceito' },
      contracted: { color: 'bg-purple-100 text-purple-700', text: 'Contratado' },
    };
    const badge = badges[status as keyof typeof badges] || badges.draft;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return 'R$ 0,00';
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Documentos Salvos</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Fechar"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('quote')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'quote'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Orçamentos
            </button>
            <button
              onClick={() => setFilter('contract')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'contract'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Contratos
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando documentos...</p>
            </div>
          ) : contracts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {filter === 'all' && <FileText size={64} className="mx-auto" />}
                {filter === 'quote' && <Receipt size={64} className="mx-auto" />}
                {filter === 'contract' && <FileSignature size={64} className="mx-auto" />}
              </div>
              <p className="text-gray-600 text-lg">
                Nenhum {filter === 'quote' ? 'orçamento' : filter === 'contract' ? 'contrato' : 'documento'} encontrado
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {contract.type === 'contract' ? (
                          <FileSignature className="text-blue-600" size={24} />
                        ) : (
                          <Receipt className="text-green-600" size={24} />
                        )}
                        <h3 className="text-lg font-semibold text-gray-800">
                          {contract.title}
                        </h3>
                        {getStatusBadge(contract.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Cliente:</span> {contract.client_name}
                        </div>
                        <div>
                          <span className="font-medium">Telefone:</span> {contract.client_phone}
                        </div>
                        <div>
                          <span className="font-medium">Total:</span> {formatCurrency(contract.total)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(contract.created_at)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => onLoadContract(contract)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={20} />
                      </button>

                      {contract.type === 'quote' && (
                        <button
                          onClick={() => onConvertToContract(contract)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Converter para contrato"
                        >
                          <FileSignature size={20} />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(contract.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
