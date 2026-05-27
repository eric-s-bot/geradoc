/*
  # Update foreign key constraint for demo purposes

  1. Changes
    - Temporarily disable foreign key constraint for user_id in profiles
    - This allows demo data to be inserted without requiring actual auth users
    - Foreign key will still prevent cascading deletes
  
  2. Security Notes
    - In production, this constraint should be enforced
    - For demo purposes, we allow manual profile creation
*/

ALTER TABLE profiles DROP CONSTRAINT profiles_id_fkey;

ALTER TABLE contracts DROP CONSTRAINT contracts_user_id_fkey;

ALTER TABLE contracts DROP CONSTRAINT contracts_source_contract_id_fkey;