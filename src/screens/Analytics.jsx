import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info } from 'lucide-react';

const moistureData = [
  { name: 'Mon', value: 35 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 28 }, // Irrigated
  { name: 'Thu', value: 60 },
  { name: 'Fri', value: 50 },
  { name: 'Sat', value: 40 },
  { name: 'Sun', value: 42 },
];

const irrigationData = [
  { name: 'Week 1', count: 3 },
  { name: 'Week 2', count: 4 },
  { name: 'Week 3', count: 2 },
  { name: 'Week 4', count: 3 },
];

const Analytics = () => {
  return (
    <div className="analytics">
      <header className="app-header">
        <div>
          <h1>Analytics</h1>
          <p>Data trends & analysis</p>
        </div>
      </header>

      {/* ET Estimation Card */}
      <div className="card glass flex items-center gap-4 mb-4" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))' }}>
        <div style={{ background: 'white', padding: 12, borderRadius: 12, boxShadow: 'var(--shadow-soft)' }}>
          <Info size={24} color="var(--primary-blue)" />
        </div>
        <div>
          <h3 style={{color: 'var(--primary-blue)', marginBottom: 4}}>Evapotranspiration (ET) Estimate</h3>
          <p style={{fontSize: 13, color: 'var(--text-main)'}}>Estimated daily water loss: <strong>4.2 mm/day</strong>.</p>
          <p style={{fontSize: 13, color: 'var(--text-muted)'}}>Recommended irrigation duration: 25 mins.</p>
        </div>
      </div>

      {/* Trend Insights String */}
      <div className="card mb-4">
        <h3 className="mb-2">Trend Insights</h3>
        <p style={{fontStyle: 'italic', borderLeft: '3px solid var(--primary-green)', paddingLeft: 12}}>
          "Soil dries faster in the afternoon (2 PM - 4 PM) due to high solar radiation. Consider morning irrigation."
        </p>
      </div>

      <section className="mb-4">
        <h2>Soil Moisture Trends (Last 7 Days)</h2>
        <div className="card" style={{ height: 300, padding: '20px 10px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moistureData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-hover)' }}
              />
              <Line type="monotone" dataKey="value" stroke="var(--primary-blue)" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mb-4">
        <h2>Monthly Irrigation Frequency</h2>
        <div className="card" style={{ height: 300, padding: '20px 10px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={irrigationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: 'rgba(59, 130, 246, 0.05)'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-hover)' }}
              />
              <Bar dataKey="count" fill="var(--primary-green)" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

    </div>
  );
};

export default Analytics;
