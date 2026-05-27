/*
  # Insert sample data for demonstration

  1. Sample Data
    - Creates sample contracts and quotes for testing
    - Uses a demo user ID for demonstration
  
  2. Notes
    - This data is for demonstration purposes only
    - User should sign up to create their own account
*/

INSERT INTO profiles (id, email, full_name, plan, contracts_this_month)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'demo@markethost.com.br',
  'Demo User - Market Host',
  'pro',
  5
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO contracts (user_id, title, content, type, status, total, discount, client_name, client_email, client_phone, client_document, client_address, metadata, created_at) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Orçamento - João Silva',
  'Orçamento para João Silva com 3 serviços',
  'quote',
  'sent',
  4500.00,
  500.00,
  'João Silva',
  'joao.silva@email.com',
  '(11) 99999-1234',
  '123.456.789-00',
  'Rua das Flores, 123 - São Paulo, SP',
  '{"clientName":"João Silva","clientDocument":"123.456.789-00","clientAddress":"Rua das Flores, 123 - São Paulo, SP","clientPhone":"(11) 99999-1234","clientEmail":"joao.silva@email.com","services":[{"id":"1","description":"Desenvolvimento de site institucional com 5 páginas","value":3000,"discount":300},{"id":"2","description":"Hospedagem web por 12 meses","value":1200,"discount":200},{"id":"3","description":"Configuração de e-mail profissional","value":800,"discount":0}],"contractDate":"2025-01-15","documentType":"quote"}',
  '2025-01-15 10:00:00+00'
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Contrato - Maria Santos',
  'Contrato para Maria Santos com 2 serviços',
  'contract',
  'accepted',
  3200.00,
  200.00,
  'Maria Santos',
  'maria.santos@empresa.com',
  '(21) 98888-5678',
  '987.654.321-00',
  'Av. Paulista, 1000 - São Paulo, SP',
  '{"clientName":"Maria Santos","clientDocument":"987.654.321-00","clientAddress":"Av. Paulista, 1000 - São Paulo, SP","clientPhone":"(21) 98888-5678","clientEmail":"maria.santos@empresa.com","services":[{"id":"1","description":"Loja virtual completa com integração de pagamento","value":2800,"discount":100},{"id":"2","description":"Manutenção mensal por 6 meses","value":600,"discount":100}],"contractDate":"2025-01-20","documentType":"contract"}',
  '2025-01-20 14:30:00+00'
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Orçamento - Pedro Oliveira',
  'Orçamento para Pedro Oliveira com 4 serviços',
  'quote',
  'draft',
  7800.00,
  800.00,
  'Pedro Oliveira',
  'pedro@techstartup.com',
  '(31) 97777-9012',
  '456.789.123-45',
  'Rua Augusta, 500 - Belo Horizonte, MG',
  '{"clientName":"Pedro Oliveira","clientDocument":"456.789.123-45","clientAddress":"Rua Augusta, 500 - Belo Horizonte, MG","clientPhone":"(31) 97777-9012","clientEmail":"pedro@techstartup.com","services":[{"id":"1","description":"Aplicativo mobile iOS e Android","value":5000,"discount":400},{"id":"2","description":"API REST completa","value":1500,"discount":200},{"id":"3","description":"Dashboard administrativo","value":1200,"discount":100},{"id":"4","description":"Suporte técnico 24/7 por 3 meses","value":2100,"discount":100}],"contractDate":"2025-01-25","documentType":"quote"}',
  '2025-01-25 09:15:00+00'
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Contrato - Empresa ABC Ltda',
  'Contrato para Empresa ABC Ltda com 5 serviços',
  'contract',
  'contracted',
  15000.00,
  1500.00,
  'Empresa ABC Ltda',
  'contato@empresaabc.com.br',
  '(11) 3333-4444',
  '12.345.678/0001-90',
  'Av. Brigadeiro Faria Lima, 2000 - São Paulo, SP',
  '{"clientName":"Empresa ABC Ltda","clientDocument":"12.345.678/0001-90","clientAddress":"Av. Brigadeiro Faria Lima, 2000 - São Paulo, SP","clientPhone":"(11) 3333-4444","clientEmail":"contato@empresaabc.com.br","services":[{"id":"1","description":"Sistema ERP completo personalizado","value":7000,"discount":800},{"id":"2","description":"Integração com nota fiscal eletrônica","value":1500,"discount":200},{"id":"3","description":"Módulo de gestão financeira","value":2000,"discount":200},{"id":"4","description":"Treinamento da equipe (20 horas)","value":2500,"discount":200},{"id":"5","description":"Manutenção e suporte por 12 meses","value":2500,"discount":100}],"contractDate":"2025-02-01","documentType":"contract"}',
  '2025-02-01 16:45:00+00'
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Orçamento - Ana Paula',
  'Orçamento para Ana Paula com 2 serviços',
  'quote',
  'sent',
  2500.00,
  300.00,
  'Ana Paula',
  'ana.paula@design.com',
  '(41) 96666-7890',
  '789.012.345-67',
  'Rua XV de Novembro, 300 - Curitiba, PR',
  '{"clientName":"Ana Paula","clientDocument":"789.012.345-67","clientAddress":"Rua XV de Novembro, 300 - Curitiba, PR","clientPhone":"(41) 96666-7890","clientEmail":"ana.paula@design.com","services":[{"id":"1","description":"Redesign completo do site","value":2000,"discount":200},{"id":"2","description":"Criação de identidade visual","value":800,"discount":100}],"contractDate":"2025-02-10","documentType":"quote"}',
  '2025-02-10 11:20:00+00'
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Contrato - Carlos Mendes',
  'Contrato para Carlos Mendes com 3 serviços',
  'contract',
  'draft',
  5500.00,
  500.00,
  'Carlos Mendes',
  'carlos@negocios.com',
  '(51) 95555-3456',
  '234.567.890-12',
  'Rua Sete de Setembro, 800 - Porto Alegre, RS',
  '{"clientName":"Carlos Mendes","clientDocument":"234.567.890-12","clientAddress":"Rua Sete de Setembro, 800 - Porto Alegre, RS","clientPhone":"(51) 95555-3456","clientEmail":"carlos@negocios.com","services":[{"id":"1","description":"Marketing digital completo (redes sociais, SEO, SEM)","value":3500,"discount":350},{"id":"2","description":"Criação de conteúdo (posts, vídeos, ebooks)","value":1500,"discount":100},{"id":"3","description":"Consultoria estratégica (10 horas)","value":1000,"discount":50}],"contractDate":"2025-02-15","documentType":"contract"}',
  '2025-02-15 13:10:00+00'
);