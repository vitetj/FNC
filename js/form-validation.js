/**
 * Client-side form validation for the FNC form
 */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      // Get required fields
      const of = document.getElementById('of').value.trim();
      const numeroDossier = document.getElementById('numeroDossier').value.trim();
      const numeroFNC = document.getElementById('numeroFNC').value.trim();
      
      // Initialize error flag and messages
      let hasErrors = false;
      let errorMessages = [];
      
      // Validate required fields
      if (!of) {
        hasErrors = true;
        errorMessages.push('Le champ OF est requis.');
        highlightField('of');
      }
      
      if (!numeroDossier) {
        hasErrors = true;
        errorMessages.push('Le champ Numéro du dossier est requis.');
        highlightField('numeroDossier');
      }
      
      if (!numeroFNC) {
        hasErrors = true;
        errorMessages.push('Le champ Numéro de FNC est requis.');
        highlightField('numeroFNC');
      }
      
      // Validate numeric fields
      const numericFields = ['quantiteLancees', 'quantiteRebutees', 'quantiteRetouchees', 'temps'];
      numericFields.forEach(field => {
        const element = document.getElementById(field);
        if (element && element.value.trim() !== '') {
          const value = parseFloat(element.value);
          if (isNaN(value) || value < 0) {
            hasErrors = true;
            errorMessages.push(`Le champ ${getFieldLabel(field)} doit être un nombre positif.`);
            highlightField(field);
          }
        }
      });
      
      // If there are errors, prevent form submission and display errors
      if (hasErrors) {
        event.preventDefault();
        
        // Create or update error message container
        let errorContainer = document.querySelector('.error-container');
        if (!errorContainer) {
          errorContainer = document.createElement('div');
          errorContainer.className = 'error-container bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6';
          errorContainer.setAttribute('role', 'alert');
          form.prepend(errorContainer);
        }
        
        // Display error messages
        errorContainer.innerHTML = `
          <p class="font-medium">Veuillez corriger les erreurs suivantes:</p>
          <ul class="list-disc pl-5 mt-2">
            ${errorMessages.map(msg => `<li>${msg}</li>`).join('')}
          </ul>
        `;
        
        // Scroll to error container
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    
    // Type action radio buttons change handler
    const typeActionRadios = document.querySelectorAll('input[name="typeAction"]');
    const retoucheSection = document.querySelector('.retouche-section');
    
    typeActionRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'Retouche' && retoucheSection) {
          retoucheSection.style.display = 'block';
        } else if (retoucheSection) {
          retoucheSection.style.display = 'none';
        }
      });
    });
  }
  
  // Helper function to highlight invalid fields
  function highlightField(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add('border-red-500', 'bg-red-50');
      field.addEventListener('input', function() {
        this.classList.remove('border-red-500', 'bg-red-50');
      }, { once: true });
    }
  }
  
  // Helper function to get readable field labels
  function getFieldLabel(fieldId) {
    const labelMap = {
      'of': 'OF',
      'origine': 'Origine',
      'numeroDossier': 'Numéro du dossier',
      'referencePieces': 'Référence pièces',
      'quantiteLancees': 'Quantité lancées',
      'quantiteRebutees': 'Quantité rebutées',
      'quantiteRetouchees': 'Quantité retouchées',
      'numeroFNC': 'Numéro de FNC',
      'erreurService': 'Erreur Service',
      'cause': 'Cause',
      'retouche': 'Retouche',
      'phase': 'Phase',
      'temps': 'Temps'
    };
    
    return labelMap[fieldId] || fieldId;
  }
});