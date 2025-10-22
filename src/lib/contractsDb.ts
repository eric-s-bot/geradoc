import { supabase } from './supabase';
import { ContractData, SavedContract } from '../types/contract';

export const contractsDb = {
  async saveContract(userId: string, data: ContractData, status: 'draft' | 'sent' = 'draft') {
    const subtotal = data.services.reduce((sum, service) => sum + service.value, 0);
    const totalDiscount = data.services.reduce((sum, service) => sum + service.discount, 0);
    const total = subtotal - totalDiscount;

    const title = `${data.documentType === 'contract' ? 'Contrato' : 'Orçamento'} - ${data.clientName}`;
    const content = `${data.documentType === 'contract' ? 'Contrato' : 'Orçamento'} para ${data.clientName} com ${data.services.length} serviço(s)`;

    const { data: savedContract, error } = await supabase
      .from('contracts')
      .insert({
        user_id: userId,
        title,
        content,
        type: data.documentType,
        status,
        total,
        discount: totalDiscount,
        client_name: data.clientName,
        client_email: data.clientEmail || null,
        client_phone: data.clientPhone,
        client_document: data.clientDocument || null,
        client_address: data.clientAddress || null,
        metadata: data,
      })
      .select()
      .single();

    return { data: savedContract, error };
  },

  async updateContract(contractId: string, data: ContractData, status?: 'draft' | 'sent' | 'accepted' | 'contracted') {
    const subtotal = data.services.reduce((sum, service) => sum + service.value, 0);
    const totalDiscount = data.services.reduce((sum, service) => sum + service.discount, 0);
    const total = subtotal - totalDiscount;

    const title = `${data.documentType === 'contract' ? 'Contrato' : 'Orçamento'} - ${data.clientName}`;
    const content = `${data.documentType === 'contract' ? 'Contrato' : 'Orçamento'} para ${data.clientName} com ${data.services.length} serviço(s)`;

    const updateData: Record<string, unknown> = {
      title,
      content,
      type: data.documentType,
      total,
      discount: totalDiscount,
      client_name: data.clientName,
      client_email: data.clientEmail || null,
      client_phone: data.clientPhone,
      client_document: data.clientDocument || null,
      client_address: data.clientAddress || null,
      metadata: data,
    };

    if (status) {
      updateData.status = status;
    }

    const { data: updatedContract, error } = await supabase
      .from('contracts')
      .update(updateData)
      .eq('id', contractId)
      .select()
      .single();

    return { data: updatedContract, error };
  },

  async createContractFromQuote(userId: string, quoteId: string, contractData: ContractData) {
    const subtotal = contractData.services.reduce((sum, service) => sum + service.value, 0);
    const totalDiscount = contractData.services.reduce((sum, service) => sum + service.discount, 0);
    const total = subtotal - totalDiscount;

    const title = `Contrato - ${contractData.clientName}`;
    const content = `Contrato para ${contractData.clientName} com ${contractData.services.length} serviço(s)`;

    const { data: newContract, error } = await supabase
      .from('contracts')
      .insert({
        user_id: userId,
        title,
        content,
        type: 'contract',
        status: 'draft',
        total,
        discount: totalDiscount,
        client_name: contractData.clientName,
        client_email: contractData.clientEmail || null,
        client_phone: contractData.clientPhone,
        client_document: contractData.clientDocument || null,
        client_address: contractData.clientAddress || null,
        metadata: contractData,
        source_contract_id: quoteId,
      })
      .select()
      .single();

    return { data: newContract, error };
  },

  async listContracts(userId: string, type?: 'contract' | 'quote') {
    let query = supabase
      .from('contracts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    return { data: data as SavedContract[] | null, error };
  },

  async getContract(contractId: string) {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', contractId)
      .maybeSingle();

    return { data: data as SavedContract | null, error };
  },

  async deleteContract(contractId: string) {
    const { error } = await supabase
      .from('contracts')
      .delete()
      .eq('id', contractId);

    return { error };
  },

  async updateStatus(contractId: string, status: 'draft' | 'sent' | 'accepted' | 'contracted') {
    const { data, error } = await supabase
      .from('contracts')
      .update({ status })
      .eq('id', contractId)
      .select()
      .single();

    return { data: data as SavedContract | null, error };
  },
};
