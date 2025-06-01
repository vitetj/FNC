-- Create FNC forms table
CREATE TABLE IF NOT EXISTS fnc_forms (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  type_action ENUM('Retouche', 'Rebut') NOT NULL,
  of VARCHAR(255) NOT NULL,
  origine VARCHAR(255),
  numero_dossier VARCHAR(255) NOT NULL,
  reference_pieces VARCHAR(255),
  quantite_lancees INT CHECK (quantite_lancees >= 0),
  quantite_rebutees INT CHECK (quantite_rebutees >= 0),
  quantite_retouchees INT CHECK (quantite_retouchees >= 0),
  numero_fnc VARCHAR(255) NOT NULL,
  erreur_service VARCHAR(255),
  cause TEXT,
  retouche TEXT,
  phase VARCHAR(255),
  temps INT CHECK (temps >= 0),
  status ENUM('En cours', 'Terminé') NOT NULL DEFAULT 'En cours',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index for common queries
CREATE INDEX idx_fnc_type_action ON fnc_forms(type_action);
CREATE INDEX idx_fnc_created_at ON fnc_forms(created_at);