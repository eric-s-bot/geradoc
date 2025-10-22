/*
  # Add metadata field to contracts table

  1. Changes
    - Add `metadata` JSONB column to store complete contract data for PDF generation
    - This field will store the structured data (services, client info, etc.)
  
  2. Notes
    - Using JSONB for efficient querying and indexing
    - Field is nullable to maintain backward compatibility
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contracts' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE contracts ADD COLUMN metadata JSONB NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS contracts_metadata_idx ON contracts USING GIN (metadata);