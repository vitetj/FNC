/*
  # Update RLS policies for fnc_forms table

  1. Changes
    - Drop existing INSERT policy
    - Create new INSERT policy with proper checks
    - Ensure proper validation of numeric fields

  2. Security
    - Enable RLS (already enabled)
    - Add policy for INSERT with proper validation
    - Maintain existing SELECT policy
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.fnc_forms;

-- Create new INSERT policy with proper validation
CREATE POLICY "Enable form submissions" ON public.fnc_forms
FOR INSERT TO authenticated, anon
WITH CHECK (
  -- Validate required fields
  type_action IS NOT NULL AND
  of IS NOT NULL AND
  numero_dossier IS NOT NULL AND
  numero_fnc IS NOT NULL AND
  
  -- Validate type_action values
  type_action IN ('Retouche', 'Rebut') AND
  
  -- Validate numeric fields are non-negative when provided
  (quantite_lancees IS NULL OR quantite_lancees >= 0) AND
  (quantite_rebutees IS NULL OR quantite_rebutees >= 0) AND
  (quantite_retouchees IS NULL OR quantite_retouchees >= 0) AND
  (temps IS NULL OR temps >= 0)
);