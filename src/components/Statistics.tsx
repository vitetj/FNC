import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { staticData } from '../lib/db';

interface StatsData {
  monthlyData: Array<{
    name: string;
    retouches: number;
    rebuts: number;
  }>;
  typeData: Array<{
    name: string;
    value: number;
  }>;
  totalFNC: number;
  totalRetouches: number;
  totalRebuts: number;
  avgTemps: number;
}

function Statistics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatsData>({
    monthlyData: [],
    typeData: [],
    totalFNC: 0,
    totalRetouches: 0,
    totalRebuts: 0,
    avgTemps: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const forms = staticData.forms;

        // Process monthly data
        const monthlyStats: Record<string, { retouches: number; rebuts: number }> = {};
        for (const form of forms) {
          const month = new Date(form.created_at).toLocaleString('fr-FR', { month: 'short' });
          if (!monthlyStats[month]) {
            monthlyStats[month] = { retouches: 0, rebuts: 0 };
          }
          if (form.type_action === 'Retouche') {
            monthlyStats[month].retouches++;
          } else {
            monthlyStats[month].rebuts++;
          }
        }

        const monthlyData = Object.entries(monthlyStats).map(([name, counts]: [string, { retouches: number; rebuts: number }]) => ({
          name,
          retouches: counts.retouches,
          rebuts: counts.rebuts
        }));

        // Calculate totals
        const totalRetouches = forms.filter(f => f.type_action === 'Retouche').length;
        const totalRebuts = forms.filter(f => f.type_action === 'Rebut').length;

        // Calculate average time
        const validTimes = forms
          .filter(f => f.temps !== null)
          .map(f => f.temps);
        const avgTemps = validTimes.length > 0
          ? Math.round(validTimes.reduce((a, b) => a + b, 0) / validTimes.length)
          : 0;

        setStats({
          monthlyData,
          typeData: [
            { name: 'Retouches', value: totalRetouches },
            { name: 'Rebuts', value: totalRebuts }
          ],
          totalFNC: forms.length,
          totalRetouches,
          totalRebuts,
          avgTemps
        });

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white shadow rounded p-4 mb-4 animate-fade-in text-center">
        <div className="spinner-border text-danger\" role="status">
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

  const COLORS = ['#C81517', '#dc3545'];

  return (
    <div className="bg-white shadow rounded p-4 mb-4 animate-fade-in">
      <h2 className="h4 mb-4" style={{ color: '#C81517' }}>Statistiques FNC</h2>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="h5 mb-4">Évolution mensuelle</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.monthlyData}>
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
                    data={stats.typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.typeData.map((entry, index) => (
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
                    <p className="h3 mb-0" style={{ color: '#C81517' }}>{stats.totalFNC}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border rounded p-3 text-center">
                    <h4 className="h6 mb-2">Retouches</h4>
                    <p className="h3 mb-0" style={{ color: '#C81517' }}>{stats.totalRetouches}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border rounded p-3 text-center">
                    <h4 className="h6 mb-2">Rebuts</h4>
                    <p className="h3 mb-0" style={{ color: '#C81517' }}>{stats.totalRebuts}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border rounded p-3 text-center">
                    <h4 className="h6 mb-2">Temps moyen</h4>
                    <p className="h3 mb-0" style={{ color: '#C81517' }}>{stats.avgTemps}min</p>
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