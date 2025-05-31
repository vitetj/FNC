import React, { useEffect, useState } from 'react';
import { FileText, Download, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Report {
  id: string;
  created_at: string;
  type_action: string;
  of: string;
  status: string;
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
      let query = supabase
        .from('fnc_forms')
        .select('id, created_at, type_action, of, status, numero_fnc')
        .order('created_at', { ascending: false });

      if (filters.dateStart) {
        query = query.gte('created_at', filters.dateStart);
      }
      if (filters.dateEnd) {
        query = query.lte('created_at', filters.dateEnd);
      }
      if (filters.type) {
        query = query.eq('type_action', filters.type);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setReports(data || []);
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

  if (loading) {
    return (
      <div className="bg-white shadow rounded p-4 mb-4 animate-fade-in text-center">
        <div className="spinner-border text-danger\" role=\"status">
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
            <div className="col-md-3">
              <label className="form-label">Statut</label>
              <select
                name="status"
                className="form-select"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Tous</option>
                <option value="Terminé">Terminé</option>
                <option value="En cours">En cours</option>
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
              <th>Statut</th>
              <th>Actions</th>
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