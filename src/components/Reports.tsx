import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';

// Sample data - replace with actual data from your backend
const reports = [
  {
    id: 'FNC-2024-001',
    date: '2024-03-15',
    type: 'Retouche',
    of: 'OF-123456',
    status: 'Terminé'
  },
  {
    id: 'FNC-2024-002',
    date: '2024-03-14',
    type: 'Rebut',
    of: 'OF-123457',
    status: 'En cours'
  },
  {
    id: 'FNC-2024-003',
    date: '2024-03-13',
    type: 'Retouche',
    of: 'OF-123458',
    status: 'Terminé'
  }
];

function Reports() {
  return (
    <div className="bg-white shadow rounded p-4 mb-4 animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0" style={{ color: '#C81517' }}>Rapports FNC</h2>
        <button className="btn btn-outline-danger d-flex align-items-center gap-2">
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
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Date fin</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Type</label>
              <select className="form-select">
                <option value="">Tous</option>
                <option value="retouche">Retouche</option>
                <option value="rebut">Rebut</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Statut</label>
              <select className="form-select">
                <option value="">Tous</option>
                <option value="termine">Terminé</option>
                <option value="en_cours">En cours</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-danger d-flex align-items-center gap-2">
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
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{new Date(report.date).toLocaleDateString('fr-FR')}</td>
                <td>
                  <span className={`badge ${report.type === 'Retouche' ? 'bg-danger' : 'bg-warning'}`}>
                    {report.type}
                  </span>
                </td>
                <td>{report.of}</td>
                <td>
                  <span className={`badge ${report.status === 'Terminé' ? 'bg-success' : 'bg-info'}`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2">
                    <FileText size={16} />
                    Détails
                  </button>
                </td>
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