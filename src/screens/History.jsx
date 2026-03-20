import React from 'react';
import { Clock, Filter, Droplet } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const History = () => {
  const { history } = useAppContext();

  return (
    <div className="history animate-fade-in">
      <header className="app-header">
        <div>
          <h1>Irrigation Logs</h1>
          <p>Complete execution history</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} color="var(--text-muted)" />
          <select 
            className="form-input" 
            style={{ padding: '6px 12px', fontSize: 14 }}
          >
            <option value="All">All Time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
      </header>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {history.map((record, i) => (
          <div key={record.id} className="list-item" style={{ animation: `slideUp 0.3s ease forwards`, animationDelay: `${i * 0.05}s`, opacity: 0, transform: 'translateY(10px)' }}>
            <div className="flex items-center gap-4">
              <div 
                style={{ 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  padding: 12, 
                  borderRadius: 12,
                  color: 'var(--primary-blue)'
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <h3 className="mb-2" style={{marginBottom: 4}}>{record.date}</h3>
                <p style={{fontSize: 13, display: 'flex', gap: 6, alignItems: 'center'}}><span style={{width:6, height:6, background:'var(--primary-green)', borderRadius:'50%'}}></span>{record.time}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="badge badge-success" style={{ marginBottom: 6 }}>
                <Droplet size={12} /> {record.moisture}%
              </div>
              <p style={{fontSize: 12, color: 'var(--text-muted)', fontWeight: 600}}>{record.duration} minutes</p>
            </div>
          </div>
        ))}
        {history.length === 0 && (
          <div className="text-center" style={{ padding: 40 }}>
            <p style={{color: 'var(--text-muted)'}}>No past irrigation records found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
