import React from 'react';
import { useState } from 'react';
import { Send } from 'lucide-react';

interface FormData {
  typeAction: 'Retouche' | 'Rebut';
  of: string;
  origine: string;
  numeroDossier: string;
  referencePieces: string;
  quantiteLancees: string;
  quantiteRebutees: string;
  quantiteRetouchees: string;
  numeroFNC: string;
  erreurService: string;
  cause: string;
  retouche: string;
  phase: string;
  temps: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    typeAction: 'Retouche',
    of: '',
    origine: '',
    numeroDossier: '',
    referencePieces: '',
    quantiteLancees: '',
    quantiteRebutees: '',
    quantiteRetouchees: '',
    numeroFNC: '',
    erreurService: '',
    cause: '',
    retouche: '',
    phase: '',
    temps: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true);
      setFormData({
        typeAction: 'Retouche',
        of: '',
        origine: '',
        numeroDossier: '',
        referencePieces: '',
        quantiteLancees: '',
        quantiteRebutees: '',
        quantiteRetouchees: '',
        numeroFNC: '',
        erreurService: '',
        cause: '',
        retouche: '',
        phase: '',
        temps: ''
      });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-vh-100 py-4">
      <div className="container">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="display-4" style={{ color: '#C81517' }}>Formulaire FNC</h1>
            <div className="text-right">
              <p className="text-muted small">IXAPACK</p>
            </div>
          </div>
          <div className="border-bottom border-4" style={{ borderColor: '#C81517' }}></div>
        </header>

        {success ? (
          <div className="alert alert-success animate-fade-in" role="alert">
            <p className="fw-bold">Succès!</p>
            <p>Formulaire envoyé avec succès à fnc@ixapack.com</p>
            <button 
              className="btn btn-success mt-3"
              onClick={() => setSuccess(false)}
            >
              Nouveau formulaire
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-4 animate-fade-in">
            {error && (
              <div className="alert alert-danger" role="alert">
                <p className="fw-bold">Erreur!</p>
                <p>{error}</p>
              </div>
            )}

            <div className="mb-6">
              <label className="form-label fw-semibold">Type d'action *</label>
              <div className="btn-group" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  name="typeAction"
                  id="retouche"
                  value="Retouche"
                  checked={formData.typeAction === 'Retouche'}
                  onChange={handleInputChange}
                />
                <label className="btn btn-outline-primary" htmlFor="retouche">Retouche</label>

                <input
                  type="radio"
                  className="btn-check"
                  name="typeAction"
                  id="rebut"
                  value="Rebut"
                  checked={formData.typeAction === 'Rebut'}
                  onChange={handleInputChange}
                />
                <label className="btn btn-outline-primary" htmlFor="rebut">Rebut</label>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <label htmlFor="of" className="form-label fw-semibold">OF *</label>
                  <input
                    type="text"
                    id="of"
                    name="of"
                    value={formData.of}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
              </div>
              
              <div className="col-md-6">
                <label htmlFor="origine" className="form-label fw-semibold">Origine</label>
                  <input
                    type="text"
                    id="origine"
                    name="origine"
                    value={formData.origine}
                    onChange={handleInputChange}
                    className="form-control"
                  />
              </div>
            </div>

            <div className="row g-4 mt-2">
              <div className="col-md-6">
                <label htmlFor="numeroDossier" className="form-label fw-semibold">Numéro du dossier *</label>
                <input type="text" id="numeroDossier" name="numeroDossier" value={formData.numeroDossier} onChange={handleInputChange} className="form-control" required />
              </div>
              
              <div className="col-md-6">
                <label htmlFor="referencePieces" className="form-label fw-semibold">Référence pièces</label>
                <input type="text" id="referencePieces" name="referencePieces" value={formData.referencePieces} onChange={handleInputChange} className="form-control" />
              </div>
            </div>

            <div className="row g-4 mt-2">
              <div className="col-md-4">
                <label htmlFor="quantiteLancees" className="form-label fw-semibold">Quantité lancées</label>
                <input type="number" id="quantiteLancees" name="quantiteLancees" value={formData.quantiteLancees} onChange={handleInputChange} min="0" className="form-control" />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="quantiteRebutees" className="form-label fw-semibold">Quantité rebutées</label>
                <input type="number" id="quantiteRebutees" name="quantiteRebutees" value={formData.quantiteRebutees} onChange={handleInputChange} min="0" className="form-control" />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="quantiteRetouchees" className="form-label fw-semibold">Quantité retouchées</label>
                <input type="number" id="quantiteRetouchees" name="quantiteRetouchees" value={formData.quantiteRetouchees} onChange={handleInputChange} min="0" className="form-control" />
              </div>
            </div>

            <div className="row g-4 mt-2">
              <div className="col-md-6">
                <label htmlFor="numeroFNC" className="form-label fw-semibold">Numéro de FNC *</label>
                <input type="text" id="numeroFNC" name="numeroFNC" value={formData.numeroFNC} onChange={handleInputChange} className="form-control" required />
              </div>
              
              <div className="col-md-6">
                <label htmlFor="erreurService" className="form-label fw-semibold">Erreur Service</label>
                <input type="text" id="erreurService" name="erreurService" value={formData.erreurService} onChange={handleInputChange} className="form-control" />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="cause" className="form-label fw-semibold">Cause</label>
              <textarea
                id="cause"
                name="cause"
                value={formData.cause}
                onChange={handleInputChange}
                rows={3}
                className="form-control"
              ></textarea>
            </div>

            {formData.typeAction === 'Retouche' && (
              <div className="mt-4 pt-4 border-top">
                <h3 className="h5 text-primary mb-4">Informations de retouche</h3>
                
                <div>
                  <label htmlFor="retouche" className="form-label fw-semibold">Retouche</label>
                  <textarea
                    id="retouche"
                    name="retouche"
                    value={formData.retouche}
                    onChange={handleInputChange}
                    rows={3}
                    className="form-control"
                  ></textarea>
                </div>
                
                <div className="row g-4 mt-2">
                  <div className="col-md-6">
                    <label htmlFor="phase" className="form-label fw-semibold">Phase</label>
                    <input type="text" id="phase" name="phase" value={formData.phase} onChange={handleInputChange} className="form-control" />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="temps" className="form-label fw-semibold">Temps (minutes)</label>
                    <input type="number" id="temps" name="temps" value={formData.temps} onChange={handleInputChange} min="0" className="form-control" />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 d-flex justify-content-between align-items-center">
              <p className="text-muted small mb-0">* Champs obligatoires</p>
              <div className="d-flex gap-3">
                <button
                  type="reset"
                  className="btn btn-outline-secondary"
                >
                  Réinitialiser
                </button>
                <button
                  type="submit"
                  className="btn d-flex align-items-center text-white"
                  style={{ backgroundColor: '#C81517' }}
                >
                  <Send className="me-2" size={18} />
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        )}

        <footer className="text-center text-muted small">
          <p>&copy; {new Date().getFullYear()} IXAPACK - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
}

export default App;