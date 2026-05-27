/*
  # Create contracts table

  1. New Tables
    - `contracts`
      - `id` (uuid, primary key, auto-generated)
      - `user_id` (uuid, references profiles)
      - `title` (text, not null)
      - `content` (text, not null)
      - `type` (text, not null - 'contract' or 'quote')
      - `created_at` (timestamp with time zone, default now())
      - `updated_at` (timestamp with time zone, default now())
      - `pdf_url` (text, nullable)
      - `source_contract_id` (uuid, nullable - for contracts created from quotes)
      - `status` (text, default 'draft' - draft/sent/accepted/contracted)
      - `total` (numeric, nullable)
      - `discount` (numeric, nullable)
      - `client_name` (text, nullable)
      - `client_email` (text, nullable)
      - `client_phone` (text, nullable)
      - `client_document` (text, nullable)
      - `client_address` (text, nullable)
      - `metadata` (jsonb, nullable - stored complete contract data)

  2. Security
    - Enable RLS on `contracts` table
    - Users can only manage their own contracts
*/

CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL CHECK (type IN ('contract', 'quote')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  pdf_url text,
  source_contract_id uuid REFERENCES contracts(id) ON DELETE SET NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'contracted')),
  total numeric,
  discount numeric,
  client_name text,
  client_email text,
  client_phone text,
  client_document text,
  client_address text,
  metadata jsonb
);

ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own contracts"
  ON contracts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contracts"
  ON contracts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contracts"
  ON contracts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own contracts"
  ON contracts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS contracts_user_id_idx ON contracts(user_id);
CREATE INDEX IF NOT EXISTS contracts_created_at_idx ON contracts(created_at DESC);
CREATE INDEX IF NOT EXISTS contracts_type_idx ON contracts(type);
CREATE INDEX IF NOT EXISTS contracts_metadata_idx ON contracts USING GIN (metadata);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contracts_updated_at
  BEFORE UPDATE ON contracts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();