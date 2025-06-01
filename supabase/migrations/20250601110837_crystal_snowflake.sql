/*
  # Create MySQL schema for FNC forms

  1. New Tables
    - `fnc_forms`
      - `id` (varchar(36), primary key)
      - `type_action` (enum)
      - `of` (varchar)
      - `origine` (varchar, nullable)
      - `numero_dossier` (varchar)
      - `reference_pieces` (varchar, nullable)
      - `quantite_lancees` (int, nullable)
      - `quantite_rebutees` (int, nullable)
      - `quantite_retouchees` (int, nullable)
      - `numero_fnc` (varchar)
      - `erreur_service` (varchar, nullable)
      - `cause` (text, nullable)
      - `retouche` (text, nullable)
      - `phase` (varchar, nullable)
      - `temps` (int, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Indexes
    - Primary key on `id`
    - Index on `created_at` for efficient date filtering
    - Index on `type_action` for type-based queries
*/

CREATE TABLE IF NOT EXISTS fnc_forms (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  type_action ENUM('Retouche', 'Rebut') NOT NULL,
  `of` VARCHAR(255) NOT NULL,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at),
  INDEX idx_type_action (type_action)
);