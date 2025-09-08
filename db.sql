CREATE DATABASE IF NOT EXISTS a25072eae53c9e9d;
USE a25072eae53c9e9d;

CREATE TABLE IF NOT EXISTS fnc_forms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type_action ENUM('Retouche','Rebut') NOT NULL,
  of VARCHAR(255) NOT NULL,
  origine VARCHAR(255),
  numero_dossier VARCHAR(255) NOT NULL,
  reference_pieces VARCHAR(255),
  quantite_lancees INT DEFAULT NULL,
  quantite_rebutees INT DEFAULT NULL,
  quantite_retouchees INT DEFAULT NULL,
  numero_fnc VARCHAR(255) NOT NULL,
  erreur_service VARCHAR(255),
  cause TEXT,
  retouche TEXT,
  phase VARCHAR(255),
  temps INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


