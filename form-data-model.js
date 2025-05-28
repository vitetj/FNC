/**
 * Data model for the FNC form
 * This file documents the structure of the form data
 */

const fncFormModel = {
  // Type d'action - Required field (Retouche ou Rebut)
  typeAction: {
    type: 'string',
    required: true,
    options: ['Retouche', 'Rebut']
  },
  
  // OF (Work Order) - Required field
  of: {
    type: 'string',
    required: true
  },
  
  // Origine (Origin)
  origine: {
    type: 'string',
    required: false
  },
  
  // Numéro du dossier (File Number) - Required field
  numeroDossier: {
    type: 'string',
    required: true
  },
  
  // Référence pièces (Parts Reference)
  referencePieces: {
    type: 'string',
    required: false
  },
  
  // Quantité lancées (Quantity Launched)
  quantiteLancees: {
    type: 'number',
    required: false,
    min: 0
  },
  
  // Quantité rebutées (Quantity Scrapped)
  quantiteRebutees: {
    type: 'number',
    required: false,
    min: 0
  },
  
  // Quantité retouchées (Quantity Touched Up)
  quantiteRetouchees: {
    type: 'number',
    required: false,
    min: 0
  },
  
  // Numéro de FNC (FNC Number) - Required field
  numeroFNC: {
    type: 'string',
    required: true
  },
  
  // Erreur Service (Service Error)
  erreurService: {
    type: 'string',
    required: false
  },
  
  // Cause
  cause: {
    type: 'string',
    required: false,
    multiline: true
  },
  
  // Retouche (Touch-up) - Only applicable when typeAction is 'Retouche'
  retouche: {
    type: 'string',
    required: false,
    multiline: true,
    conditionalField: true,
    showWhen: {
      field: 'typeAction',
      equals: 'Retouche'
    }
  },
  
  // Phase - Only applicable when typeAction is 'Retouche'
  phase: {
    type: 'string',
    required: false,
    conditionalField: true,
    showWhen: {
      field: 'typeAction',
      equals: 'Retouche'
    }
  },
  
  // Temps (Time) - Only applicable when typeAction is 'Retouche'
  temps: {
    type: 'number',
    required: false,
    min: 0,
    conditionalField: true,
    showWhen: {
      field: 'typeAction',
      equals: 'Retouche'
    }
  }
};

// Export the model for documentation purposes
// This is not used in the PHP implementation but serves as reference
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fncFormModel };
}