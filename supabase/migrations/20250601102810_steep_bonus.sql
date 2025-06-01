/*
  # Create MySQL schema for FNC forms

  1. New Tables
    - `fnc_forms`
      - `id` (uuid, primary key)
      - `type_action` (text)
      - `of` (text)
      - `origine` (text, nullable)
      - `numero_dossier` (text)
      - `reference_pieces` (text, nullable)
      - `quantite_lancees` (int, nullable)
      - `quantite_rebutees` (int, nullable)
      - `quantite_retouchees` (int, nullable)
      - `numero_fnc` (text)
      - `erreur_service` (text, nullable)
      - `cause` (text, nullable)
      - `retouche` (text, nullable)
      - `phase` (text, nullable)
      - `temps` (int, nullable)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
*/

CREATE TABLE IF NOT EXISTS fnc_forms (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
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
  status ENUM('En cours', 'Terminé') NOT NULL DEFAULT 'En cours',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);