import React, { useState } from 'react';
import { Clock, Filter, Droplet } from 'lucide-react';

const historyData = [
  { id: 1, date: '19 Mar 2026', time: '06:30 AM', moisture: 30, duration: 25 },
  { id: 2, date: '18 Mar 2026', time: '07:15 AM', moisture: 28, duration: 30 },
  { id: 3, date: '16 Mar 2026', time: '06:00 AM', moisture: 35, duration: 20 },
  { id: 4, date: '14 Mar 2026', time: '17:45 PM', moisture: 25, duration: 40 },
  { id: 5, date: '12 Mar 2026', time: '06:30 AM', moisture: 32, duration: 25 },
];

const History = () => {
  const [filter, setFilter] = useState('Weekly');

  const getFilteredData = () => {
    // In a real app we'd filter the data based on the selection
    if (filter === 'Daily') return [historyData[0], historyData[1]];
    if (filter === 'Monthly') return historyData;
    return historyData.slice(0, 3);
  };

  return (
    <div className="history">
      <header className="app-header">
        <div>
          <h1>Irrigation History</h1>
          <p>Past records and logs</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} color="var(--text-muted)" />
          <select 
            className="form-input" 
            style={{ padding: '6px 12px', fontSize: 14 }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
      </header>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {getFilteredData().map(record => (
          <div key={record.id} className="list-item">
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
                <p style={{fontSize: 13}}>{record.time}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="badge badge-success" style={{ marginBottom: 4 }}>
                <Droplet size={12} /> {record.moisture}%
              </div>
              <p style={{fontSize: 12, color: 'var(--text-muted)'}}>{record.duration} mins</p>
            </div>
          </div>
        ))}
        {getFilteredData().length === 0 && (
          <div className="text-center" style={{ padding: 32 }}>
            <p>No records found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
