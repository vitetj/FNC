// Static data for demonstration
export const staticData = {
  forms: [
    {
      id: '1',
      type_action: 'Retouche',
      of: 'OF-2025-001',
      origine: 'Production',
      numero_dossier: 'DOS-001',
      reference_pieces: 'REF-A123',
      quantite_lancees: 100,
      quantite_rebutees: 0,
      quantite_retouchees: 5,
      numero_fnc: 'FNC-2025-001',
      erreur_service: 'Assemblage',
      cause: 'Défaut d\'alignement',
      retouche: 'Réalignement des composants',
      phase: 'Phase 2',
      temps: 30,
      status: 'Terminé',
      created_at: '2025-03-01T10:00:00Z'
    },
    {
      id: '2',
      type_action: 'Rebut',
      of: 'OF-2025-002',
      origine: 'Contrôle Qualité',
      numero_dossier: 'DOS-002',
      reference_pieces: 'REF-B456',
      quantite_lancees: 50,
      quantite_rebutees: 2,
      quantite_retouchees: 0,
      numero_fnc: 'FNC-2025-002',
      erreur_service: 'Production',
      cause: 'Matériau défectueux',
      status: 'En cours',
      created_at: '2025-03-02T14:30:00Z'
    },
    {
      id: '3',
      type_action: 'Retouche',
      of: 'OF-2025-003',
      origine: 'Maintenance',
      numero_dossier: 'DOS-003',
      reference_pieces: 'REF-C789',
      quantite_lancees: 75,
      quantite_rebutees: 0,
      quantite_retouchees: 3,
      numero_fnc: 'FNC-2025-003',
      erreur_service: 'Maintenance',
      cause: 'Calibrage incorrect',
      retouche: 'Recalibrage des paramètres',
      phase: 'Phase 1',
      temps: 45,
      status: 'Terminé',
      created_at: '2025-03-03T09:15:00Z'
    }
  ]
};