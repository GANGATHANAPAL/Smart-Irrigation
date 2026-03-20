import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, Target } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const moistureData = [
  { name: 'Mon', value: 35 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 28 },
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
  const { activeCrop } = useAppContext();

  return (
    <div className="analytics animate-fade-in">
      <header className="app-header">
        <div>
          <h1>Analytics</h1>
          <p>Data trends & AI analysis</p>
        </div>
      </header>

      {/* Advanced AI Insight String */}
      <div className="card mb-4 border-l-primary shadow-hover transition-all">
        <h3 className="mb-2 flex items-center gap-2"><Target size={18} color="var(--primary-blue)" /> Generative Trend Insights</h3>
        <p style={{fontStyle: 'italic', background: 'rgba(59, 130, 246, 0.05)', padding: 12, borderRadius: 8, fontSize: 13, lineHeight: 1.5}}>
          "Historical analysis shows soil dries 20% faster between 2 PM - 4 PM. Your selected crop ({activeCrop.name}) is highly sensitive to rapid dehydration. Recommending early morning pre-irrigation routines."
        </p>
      </div>

      <section className="mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h2>Soil Moisture Trends (Last 7 Days)</h2>
        <div className="card" style={{ height: 320, padding: '20px 10px', paddingBottom: 30 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moistureData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-hover)' }}
              />
              <Line 
                isAnimationActive={true} 
                animationDuration={1500} 
                animationEasing="ease-in-out"
                type="monotone" 
                dataKey="value" 
                stroke="var(--primary-blue)" 
                strokeWidth={4} 
                dot={{r: 4, fill: 'var(--card-bg)', strokeWidth: 2}} 
                activeDot={{r: 6, fill: 'var(--primary-blue)'}} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2>Monthly Irrigation Frequency</h2>
        <div className="card" style={{ height: 320, padding: '20px 10px', paddingBottom: 30 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={irrigationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: 'rgba(59, 130, 246, 0.05)'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-hover)' }}
              />
              <Bar 
                isAnimationActive={true} 
                animationDuration={1500}
                animationEasing="ease-in-out"
                dataKey="count" 
                fill="var(--primary-green)" 
                radius={[6, 6, 0, 0]} 
                barSize={40} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

    </div>
  );
};

export default Analytics;
