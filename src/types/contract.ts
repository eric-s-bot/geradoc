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

export interface SavedContract {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: 'contract' | 'quote';
  created_at: string;
  updated_at: string;
  pdf_url: string | null;
  source_contract_id: string | null;
  status: 'draft' | 'sent' | 'accepted' | 'contracted';
  total: number | null;
  discount: number | null;
  client_name: string | null;
  client_email: string | null;
  client_phone: string | null;
  client_document: string | null;
  client_address: string | null;
  metadata: ContractData | null;
}