import React, { useEffect, useState } from 'react';
import { FileText, Download, Filter } from 'lucide-react';
import { staticData } from '../lib/db';
import { saveAs } from 'file-saver';

interface Report {
  id: string;
  created_at: string;
  type_action: string;
  of: string;
  status: string;
  numero_fnc: string;
  origine?: string;
  reference_pieces?: string;
  quantite_lancees?: number;
  quantite_rebutees?: number;
  quantite_retouchees?: number;
  erreur_service?: string;
  cause?: string;
  retouche?: string;
  phase?: string;
  temps?: number;
}

function Reports() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [filters, setFilters] = useState({
    dateStart: '',
    dateEnd: '',
    type: '',
    status: ''
  });

  const fetchReports = async () => {
    try {
      let filteredReports = [...staticData.forms];

      if (filters.dateStart) {
        filteredReports = filteredReports.filter(report => 
          new Date(report.created_at) >= new Date(filters.dateStart)
        );
      }
      if (filters.dateEnd) {
        filteredReports = filteredReports.filter(report => 
          new Date(report.created_at) <= new Date(filters.dateEnd)
        );
      }
      if (filters.type) {
        filteredReports = filteredReports.filter(report => 
          report.type_action === filters.type
        );
      }

      filteredReports.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setReports(filteredReports as Report[]);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReports();
  };

  const handleExport = async () => {
    try {
      const csvContent = [
        // CSV Headers
        ['Numéro FNC', 'Date', 'Type', 'OF', 'Origine', 'Référence pièces', 
         'Quantité lancées', 'Quantité rebutées', 'Quantité retouchées',
         'Erreur Service', 'Cause', 'Retouche', 'Phase', 'Temps', 'Statut'].join(','),
        // CSV Data
        ...reports.map(report => [
          report.numero_fnc,
          new Date(report.created_at).toLocaleDateString('fr-FR'),
          report.type_action,
          report.of,
          report.origine || '',
          report.reference_pieces || '',
          report.quantite_lancees || '',
          report.quantite_rebutees || '',
          report.quantite_retouchees || '',
          report.erreur_service || '',
          `"${(report.cause || '').replace(/"/g, '""')}"`,
          `"${(report.retouche || '').replace(/"/g, '""')}"`,
          report.phase || '',
          report.temps || '',
          report.status
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `fnc_reports_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (err) {
      setError('Erreur lors de l\'export');
    }
  };

  const handleDetails = (report: Report) => {
    const detailsContent = `
      <div class="modal-header">
        <h5 class="modal-title">Détails FNC ${report.numero_fnc}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <dl class="row">
          <dt class="col-sm-4">Type d'action</dt>
          <dd class="col-sm-8">${report.type_action}</dd>
          
          <dt class="col-sm-4">OF</dt>
          <dd class="col-sm-8">${report.of}</dd>
          
          <dt class="col-sm-4">Origine</dt>
          <dd class="col-sm-8">${report.origine || '-'}</dd>
          
          <dt class="col-sm-4">Référence pièces</dt>
          <dd class="col-sm-8">${report.reference_pieces || '-'}</dd>
          
          <dt class="col-sm-4">Quantité lancées</dt>
          <dd class="col-sm-8">${report.quantite_lancees || '-'}</dd>
          
          <dt class="col-sm-4">Quantité rebutées</dt>
          <dd class="col-sm-8">${report.quantite_rebutees || '-'}</dd>
          
          <dt class="col-sm-4">Quantité retouchées</dt>
          <dd class="col-sm-8">${report.quantite_retouchees || '-'}</dd>
          
          <dt class="col-sm-4">Erreur Service</dt>
          <dd class="col-sm-8">${report.erreur_service || '-'}</dd>
          
          <dt class="col-sm-4">Cause</dt>
          <dd class="col-sm-8">${report.cause || '-'}</dd>
          
          ${report.type_action === 'Retouche' ? `
            <dt class="col-sm-4">Retouche</dt>
            <dd class="col-sm-8">${report.retouche || '-'}</dd>
            
            <dt class="col-sm-4">Phase</dt>
            <dd class="col-sm-8">${report.phase || '-'}</dd>
            
            <dt class="col-sm-4">Temps</dt>
            <dd class="col-sm-8">${report.temps ? `${report.temps} minutes` : '-'}</dd>
          ` : ''}
          
          <dt class="col-sm-4">Statut</dt>
          <dd class="col-sm-8">${report.status}</dd>
        </dl>
      </div>
    `;

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          ${detailsContent}
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const modalInstance = new window.bootstrap.Modal(modal);
    modalInstance.show();

    modal.addEventListener('hidden.bs.modal', () => {
      document.body.removeChild(modal);
    });
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded p-4 mb-4 animate-fade-in text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded p-4 mb-4 animate-fade-in">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded p-4 mb-4 animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0" style={{ color: '#C81517' }}>Rapports FNC</h2>
        <button 
          className="btn btn-outline-danger d-flex align-items-center gap-2"
          onClick={handleExport}
        >
          <Download size={18} />
          Exporter
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h5 mb-3">Filtres</h3>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Date début</label>
              <input
                type="date"
                name="dateStart"
                className="form-control"
                value={filters.dateStart}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Date fin</label>
              <input
                type="date"
                name="dateEnd"
                className="form-control"
                value={filters.dateEnd}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Type</label>
              <select
                name="type"
                className="form-select"
                value={filters.type}
                onChange={handleFilterChange}
              >
                <option value="">Tous</option>
                <option value="Retouche">Retouche</option>
                <option value="Rebut">Rebut</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <button
              className="btn btn-danger d-flex align-items-center gap-2"
              onClick={handleFilterSubmit}
            >
              <Filter size={18} />
              Appliquer les filtres
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Numéro FNC</th>
              <th>Date</th>
              <th>Type</th>
              <th>OF</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.numero_fnc}</td>
                <td>{new Date(report.created_at).toLocaleDateString('fr-FR')}</td>
                <td>
                  <span className={`badge ${report.type_action === 'Retouche' ? 'bg-danger' : 'bg-warning'}`}>
                    {report.type_action}
                  </span>
                </td>
                <td>{report.of}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex={-1}>Précédent</a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Suivant</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Reports;