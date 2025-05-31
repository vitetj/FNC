import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Send, BarChart2, FileText } from 'lucide-react';
import FNCForm from './components/FNCForm';
import Statistics from './components/Statistics';
import Reports from './components/Reports';

function App() {
  return (
    <div className="min-vh-100 py-4">
      <div className="container">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="display-4" style={{ color: '#C81517' }}>IXAPACK FNC</h1>
            <nav>
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <Link to="/" className="nav-link d-flex align-items-center gap-2">
                    <Send size={18} />
                    Formulaire
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/statistics" className="nav-link d-flex align-items-center gap-2">
                    <BarChart2 size={18} />
                    Statistiques
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reports" className="nav-link d-flex align-items-center gap-2">
                    <FileText size={18} />
                    Rapports
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="border-bottom border-4" style={{ borderColor: '#C81517' }}></div>
        </header>

        <Routes>
          <Route path="/" element={<FNCForm />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>

        <footer className="text-center text-muted small mt-8">
          <p>&copy; {new Date().getFullYear()} IXAPACK - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
}

export default App;