import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { ContractData, Service } from './types/contract';
import { PDFGenerator } from './utils/pdfGenerator';
import { ClientForm } from './components/ClientForm';
import { ServiceForm } from './components/ServiceForm';
import { DocumentTypeSelector } from './components/DocumentTypeSelector';
import { FinancialSummary } from './components/FinancialSummary';
import { AuthForm } from './components/AuthForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Header } from './components/Header';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();
  const [contractData, setContractData] = useState<ContractData>({
    clientName: '',
    clientDocument: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    services: [],
    contractDate: new Date().toISOString().split('T')[0],
    documentType: 'contract'
  });

  const updateServices = (services: Service[]) => {
    setContractData(prev => ({ ...prev, services }));
  };

  const updateDocumentType = (documentType: 'contract' | 'quote') => {
    setContractData(prev => ({ ...prev, documentType }));
  };

  const generatePDF = () => {
    if (!contractData.clientName || !contractData.clientPhone || contractData.services.length === 0) {
      alert('Por favor, preencha o nome completo, telefone e adicione pelo menos um serviço.');
      return;
    }

    const generator = new PDFGenerator();
    const pdf = generator.generatePDF(contractData);
    
    const fileName = `${contractData.documentType === 'contract' ? 'contrato' : 'orcamento'}_${contractData.clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  };

  const isFormValid = contractData.clientName && 
                     contractData.clientPhone &&
                     contractData.services.length > 0;

  // Show loading spinner while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show login form if not authenticated
  if (!user) {
    return <AuthForm />;
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Type */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <DocumentTypeSelector
                documentType={contractData.documentType}
                onTypeChange={updateDocumentType}
              />
            </div>

            {/* Client Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <ClientForm
                data={contractData}
                onDataChange={setContractData}
              />
            </div>

            {/* Services Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <ServiceForm
                services={contractData.services}
                onServicesChange={updateServices}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Financial Summary */}
            <FinancialSummary
              services={contractData.services}
            />

            {/* Generate PDF Button */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={generatePDF}
                disabled={!isFormValid}
                className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isFormValid
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Download size={20} />
                Gerar {contractData.documentType === 'contract' ? 'Contrato' : 'Orçamento'} PDF
              </button>
              
              {!isFormValid && (
                <p className="text-sm text-red-600 mt-2 text-center">
                  Preencha nome completo, telefone e adicione pelo menos um serviço
                </p>
              )}
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Informações:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Contratos incluem termos e condições</li>
                <li>• Orçamentos são mais simples</li>
                <li>• Desconto aplicável por serviço</li>
                <li>• Campos de assinatura incluídos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;