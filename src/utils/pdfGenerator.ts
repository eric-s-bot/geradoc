import jsPDF from 'jspdf';
import { ContractData } from '../types/contract';
import { contractTerms } from '../data/contractTerms';

export class PDFGenerator {
  private doc: jsPDF;
  private pageHeight: number;
  private currentY: number;
  private margin: number;
  private pageWidth: number;

  constructor() {
    this.doc = new jsPDF();
    this.pageHeight = this.doc.internal.pageSize.height;
    this.pageWidth = this.doc.internal.pageSize.width;
    this.margin = 20;
    this.currentY = this.margin;
  }

  private checkPageBreak(neededHeight: number = 20): void {
    if (this.currentY + neededHeight > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
    }
  }

  private addLogo(imagePath: string, x: number, y: number, width: number, height: number): void {
    try {
      this.doc.addImage(imagePath, 'PNG', x, y, width, height);
    } catch (error) {
      console.warn(`Erro ao carregar logo: ${imagePath}`, error);
      // Continua sem a logo se houver erro
    }
  }

  private addHeader(): void {
    // Logo no topo
    this.addLogo('/logo1.png', this.margin, this.currentY, 40, 20);
    
    // Título
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('MARKET HOST', this.pageWidth/2, this.currentY + 15, { align: 'center' });
    
    this.currentY += 35;
  }

  private addContractTitle(documentType: 'contract' | 'quote'): void {
    this.checkPageBreak(30);
    
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    const title = documentType === 'contract' ? 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS' : 'ORÇAMENTO';
    this.doc.text(title, this.pageWidth/2, this.currentY, { align: 'center' });
    
    this.currentY += 20;
  }

  private addClientInfo(data: ContractData): void {
    this.checkPageBreak(60);
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('DADOS DO CONTRATANTE:', this.margin, this.currentY);
    this.currentY += 10;
    
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Nome: ${data.clientName}`, this.margin, this.currentY);
    this.currentY += 8;
    this.doc.text(`Documento: ${data.clientDocument}`, this.margin, this.currentY);
    this.currentY += 8;
    this.doc.text(`Endereço: ${data.clientAddress}`, this.margin, this.currentY);
    this.currentY += 8;
    this.doc.text(`Telefone: ${data.clientPhone}`, this.margin, this.currentY);
    this.currentY += 8;
    this.doc.text(`E-mail: ${data.clientEmail}`, this.margin, this.currentY);
    this.currentY += 15;
  }

  private addContractTerms(): void {
    this.checkPageBreak(30);
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('TERMOS E CONDIÇÕES', this.pageWidth/2, this.currentY, { align: 'center' });
    this.currentY += 15;

    contractTerms.forEach(term => {
      this.checkPageBreak(40);
      
      // Título da seção
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(term.title, this.margin, this.currentY);
      this.currentY += 8;
      
      // Conteúdo da seção
      this.doc.setFont('helvetica', 'normal');
      term.content.forEach(paragraph => {
        const lines = this.doc.splitTextToSize(paragraph, this.pageWidth - 2 * this.margin);
        this.checkPageBreak(lines.length * 5 + 5);
        
        lines.forEach((line: string) => {
          this.doc.text(line, this.margin + 5, this.currentY);
          this.currentY += 5;
        });
        this.currentY += 3;
      });
      
      this.currentY += 5;
    });
  }

  private addServicesTable(data: ContractData): void {
    this.checkPageBreak(60);
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('SERVIÇOS CONTRATADOS', this.pageWidth/2, this.currentY, { align: 'center' });
    this.currentY += 15;

    // Cabeçalho da tabela
    const colWidths = [80, 30, 30, 30];
    const colPositions = [
      this.margin, 
      this.margin + colWidths[0], 
      this.margin + colWidths[0] + colWidths[1],
      this.margin + colWidths[0] + colWidths[1] + colWidths[2]
    ];

    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');
    
    // Desenhar cabeçalho
    const totalWidth = colWidths.reduce((sum, width) => sum + width, 0);
    this.doc.rect(this.margin, this.currentY, totalWidth, 8);
    this.doc.text('DESCRIÇÃO DO SERVIÇO', colPositions[0] + 2, this.currentY + 6);
    this.doc.text('VALOR', colPositions[1] + 2, this.currentY + 6);
    this.doc.text('DESCONTO', colPositions[2] + 2, this.currentY + 6);
    this.doc.text('TOTAL', colPositions[3] + 2, this.currentY + 6);
    this.currentY += 8;

    // Linhas dos serviços
    this.doc.setFont('helvetica', 'normal');
    let subtotal = 0;
    let totalDiscount = 0;

    data.services.forEach(service => {
      this.checkPageBreak(15);
      
      // Desenhar células
      colWidths.forEach((width, index) => {
        this.doc.rect(colPositions[index], this.currentY, width, 8);
      });
      
      const descLines = this.doc.splitTextToSize(service.description, colWidths[0] - 4);
      this.doc.text(descLines[0], colPositions[0] + 2, this.currentY + 6);
      this.doc.text(service.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }), colPositions[1] + 2, this.currentY + 6);
      this.doc.text(service.discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }), colPositions[2] + 2, this.currentY + 6);
      
      const serviceTotal = service.value - service.discount;
      this.doc.text(serviceTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }), colPositions[3] + 2, this.currentY + 6);
      
      subtotal += service.value;
      totalDiscount += service.discount;
      this.currentY += 8;
    });

    // Totais
    this.currentY += 5;
    this.doc.setFont('helvetica', 'bold');
    
    this.doc.text(`Subtotal: R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, this.margin, this.currentY);
    this.currentY += 8;
    
    if (totalDiscount > 0) {
      this.doc.text(`Total de Descontos: R$ ${totalDiscount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, this.margin, this.currentY);
      this.currentY += 8;
    }
    
    const total = subtotal - totalDiscount;
    this.doc.setFontSize(12);
    this.doc.text(`VALOR TOTAL: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, this.margin, this.currentY);
    this.currentY += 15;
  }

  private addSignatures(): void {
    this.checkPageBreak(80);
    
    this.currentY += 20;
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, this.margin, this.currentY);
    this.currentY += 30;

    // Assinaturas
    const signatureWidth = 70;
    const signatureY = this.currentY;
    
    // Assinatura Market Host
    this.doc.line(this.margin, signatureY, this.margin + signatureWidth, signatureY);
    this.doc.text('Market Host', this.margin + signatureWidth/2, signatureY + 8, { align: 'center' });
    this.doc.text('Responsável', this.margin + signatureWidth/2, signatureY + 15, { align: 'center' });
    
    // Assinatura Cliente
    const clientSignatureX = this.pageWidth - this.margin - signatureWidth;
    this.doc.line(clientSignatureX, signatureY, clientSignatureX + signatureWidth, signatureY);
    this.doc.text('Contratante', clientSignatureX + signatureWidth/2, signatureY + 8, { align: 'center' });
    
    this.currentY = signatureY + 25;
    
    // Logo no final
    this.addLogo('/logo2.png', this.pageWidth/2 - 20, this.currentY, 40, 20);
  }

  public generatePDF(data: ContractData): jsPDF {
    this.addHeader();
    this.addContractTitle(data.documentType);
    this.addClientInfo(data);
    
    if (data.documentType === 'contract') {
      this.addContractTerms();
    }
    
    this.addServicesTable(data);
    this.addSignatures();
    
    return this.doc;
  }
}