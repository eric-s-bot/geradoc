export interface Service {
  id: string;
  description: string;
  value: number;
  discount: number;
}

export interface ContractData {
  clientName: string;
  clientDocument: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  services: Service[];
  contractDate: string;
  documentType: 'contract' | 'quote';
}

export interface ContractTerms {
  title: string;
  content: string[];
}