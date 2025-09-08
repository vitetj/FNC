import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FNCForm from './components/FNCForm';
import Statistics from './components/Statistics';
import Reports from './components/Reports';
import { FileText, BarChart2, FileSpreadsheet } from 'lucide-react';

function App() {
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

        <nav className="nav nav-pills mb-4">
          <Link to="/" className="nav-link d-flex align-items-center gap-2" style={{ color: '#C81517' }}>
            <FileText size={18} />
            Formulaire
          </Link>
          <Link to="/statistics" className="nav-link d-flex align-items-center gap-2" style={{ color: '#C81517' }}>
            <BarChart2 size={18} />
            Statistiques
          </Link>
          <Link to="/reports" className="nav-link d-flex align-items-center gap-2" style={{ color: '#C81517' }}>
            <FileSpreadsheet size={18} />
            Rapports
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<FNCForm />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>

        <footer className="text-center text-muted small">
          <p>&copy; {new Date().getFullYear()} IXAPACK - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
}

export default App

