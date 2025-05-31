/*
  # Create FNC tables

  1. New Tables
    - `fnc_forms`
      - `id` (uuid, primary key)
      - `type_action` (text) - 'Retouche' or 'Rebut'
      - `of` (text)
      - `origine` (text)
      - `numero_dossier` (text)
      - `reference_pieces` (text)
      - `quantite_lancees` (integer)
      - `quantite_rebutees` (integer)
      - `quantite_retouchees` (integer)
      - `numero_fnc` (text)
      - `erreur_service` (text)
      - `cause` (text)
      - `retouche` (text)
      - `phase` (text)
      - `temps` (integer)
      - `status` (text) - 'En cours' or 'Terminé'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `fnc_forms` table
    - Add policies for authenticated users to read and create FNC forms
*/

CREATE TABLE IF NOT EXISTS fnc_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_action text NOT NULL CHECK (type_action IN ('Retouche', 'Rebut')),
  of text NOT NULL,
  origine text,
  numero_dossier text NOT NULL,
  reference_pieces text,
  quantite_lancees integer CHECK (quantite_lancees >= 0),
  quantite_rebutees integer CHECK (quantite_rebutees >= 0),
  quantite_retouchees integer CHECK (quantite_retouchees >= 0),
  numero_fnc text NOT NULL,
  erreur_service text,
  cause text,
  retouche text,
  phase text,
  temps integer CHECK (temps >= 0),
  status text NOT NULL DEFAULT 'En cours' CHECK (status IN ('En cours', 'Terminé')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE fnc_forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users"
  ON fnc_forms
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON fnc_forms
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create an update trigger to handle updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_fnc_forms_updated_at
  BEFORE UPDATE ON fnc_forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();