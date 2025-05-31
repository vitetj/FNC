/*
  # Update FNC forms policies

  1. Changes
    - Drop existing policies
    - Add new policies for form submissions and data access
    - Ensure proper validation of form data
    
  2. Security
    - Enable RLS
    - Add policies for:
      - Form submissions (INSERT)
      - Data reading (SELECT)
      - Data updates (UPDATE)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable form submissions" ON public.fnc_forms;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.fnc_forms;

-- Create new policies
CREATE POLICY "Enable form submissions for all users"
ON public.fnc_forms
FOR INSERT
TO public
WITH CHECK (
  -- Required fields validation
  type_action IS NOT NULL AND
  of IS NOT NULL AND
  numero_dossier IS NOT NULL AND
  numero_fnc IS NOT NULL AND
  
  -- Type action validation
  type_action IN ('Retouche', 'Rebut') AND
  
  -- Numeric fields validation
  (quantite_lancees IS NULL OR quantite_lancees >= 0) AND
  (quantite_rebutees IS NULL OR quantite_rebutees >= 0) AND
  (quantite_retouchees IS NULL OR quantite_retouchees >= 0) AND
  (temps IS NULL OR temps >= 0)
);

CREATE POLICY "Enable read access for all users"
ON public.fnc_forms
FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable updates for all users"
ON public.fnc_forms
FOR UPDATE
TO public
USING (true)
WITH CHECK (
  -- Required fields validation
  type_action IS NOT NULL AND
  of IS NOT NULL AND
  numero_dossier IS NOT NULL AND
  numero_fnc IS NOT NULL AND
  
  -- Type action validation
  type_action IN ('Retouche', 'Rebut') AND
  
  -- Numeric fields validation
  (quantite_lancees IS NULL OR quantite_lancees >= 0) AND
  (quantite_rebutees IS NULL OR quantite_rebutees >= 0) AND
  (quantite_retouchees IS NULL OR quantite_retouchees >= 0) AND
  (temps IS NULL OR temps >= 0)
);