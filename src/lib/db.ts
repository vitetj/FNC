import { Database } from '@libsql/browser';

const db = new Database({
  url: 'file:fnc.db',
  syncUrl: 'file:fnc.db'
});

// Initialize database schema
db.execute(`
  CREATE TABLE IF NOT EXISTS fnc_forms (
    id TEXT PRIMARY KEY,
    type_action TEXT CHECK(type_action IN ('Retouche', 'Rebut')) NOT NULL,
    of TEXT NOT NULL,
    origine TEXT,
    numero_dossier TEXT NOT NULL,
    reference_pieces TEXT,
    quantite_lancees INTEGER CHECK (quantite_lancees >= 0),
    quantite_rebutees INTEGER CHECK (quantite_rebutees >= 0),
    quantite_retouchees INTEGER CHECK (quantite_retouchees >= 0),
    numero_fnc TEXT NOT NULL,
    erreur_service TEXT,
    cause TEXT,
    retouche TEXT,
    phase TEXT,
    temps INTEGER CHECK (temps >= 0),
    status TEXT CHECK(status IN ('En cours', 'Terminé')) NOT NULL DEFAULT 'En cours',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );
`);

export { db };