import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data - replace with actual data from your backend
const monthlyData = [
  { name: 'Jan', retouches: 4, rebuts: 2 },
  { name: 'Fév', retouches: 3, rebuts: 1 },
  { name: 'Mar', retouches: 5, rebuts: 3 },
  { name: 'Avr', retouches: 2, rebuts: 2 },
  { name: 'Mai', retouches: 6, rebuts: 4 },
  { name: 'Juin', retouches: 4, rebuts: 1 },
];

const typeData = [
  { name: 'Retouches', value: 24 },
  { name: 'Rebuts', value: 13 },
];

const COLORS = ['#C81517', '#dc3545'];

function Statistics() {
  return (
    <div className="bg-white shadow rounded p-4 mb-4 animate-fade-in">
      <h2 className="h4 mb-4" style={{ color: '#C81517' }}>Statistiques FNC</h2>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="h5 mb-4">Évolution mensuelle</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="retouches" fill="#C81517" name="Retouches" />
                  <Bar dataKey="rebuts" fill="#dc3545" name="Rebuts" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="h5 mb-4">Répartition par type</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h3 className="h5 mb-4">Résumé</h3>
              <div className="row g-4">
                <div className="col-md-3">
                  <div className="border rounded p-3 text-center">
                    <h4 className="h6 mb-2">Total FNC</h4>
                    <p className="h3 mb-0" style={{ color: '#C81517' }}>37</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border rounded p-3 text-center">
                    <h4 className="h6 mb-2">Retouches</h4>
                    <p className="h3 mb-0" style={{ color: '#C81517' }}>24</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border rounded p-3 text-center">
                    <h4 className="h6 mb-2">Rebuts</h4>
                    <p className="h3 mb-0" style={{ color: '#C81517' }}>13</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border rounded p-3 text-center">
                    <h4 className="h6 mb-2">Temps moyen</h4>
                    <p className="h3 mb-0" style={{ color: '#C81517' }}>45min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;