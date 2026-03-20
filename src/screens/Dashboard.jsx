import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Cloud, Thermometer, Droplets, Gauge, Power, Wifi, CloudOff, AlertCircle, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState({
    weather: { temp: 28, humidity: 65, rainProb: 15, condition: 'Sunny' },
    soil: { moisture: 42, temp: 24, humidity: 60, pressure: 1012 },
    irrigation: { status: false, lastIrrigated: 'Today, 06:30 AM', countThisMonth: 12 },
    connection: 'Online'
  });

  const [isIrrigating, setIsIrrigating] = useState(false);

  // Simulated dynamic recommendation
  const getRecommendation = () => {
    if (data.weather.rainProb > 70) return "Rain Expected - Irrigation Skipped";
    if (data.soil.moisture < 30) return "Irrigation Recommended";
    return "Soil Moisture Optimal";
  };

  const handleToggle = () => {
    setIsIrrigating(!isIrrigating);
    setData(prev => ({
      ...prev,
      irrigation: {
        ...prev.irrigation,
        status: !isIrrigating
      }
    }));
  };

  return (
    <div className="dashboard">
      <header className="app-header">
        <div>
          <h1>Smart Dashboard</h1>
          <p>Real-time field overview</p>
        </div>
        <div className="flex gap-2 items-center">
          {data.connection === 'Online' ? <Wifi size={20} className="text-primary-blue" /> : <CloudOff size={20} className="text-danger" />}
          <span className={`badge ${data.connection === 'Online' ? 'badge-success' : 'badge-danger'}`}>
            {data.connection}
          </span>
        </div>
      </header>

      {/* Weather Summary */}
      <section className="weather-summary">
        <div className="weather-item">
          <Thermometer size={24} />
          <span className="weather-val">{data.weather.temp}°C</span>
          <span className="weather-label">Temp</span>
        </div>
        <div className="weather-item" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
          <Droplets size={24} />
          <span className="weather-val">{data.weather.humidity}%</span>
          <span className="weather-label">Humidity</span>
        </div>
        <div className="weather-item">
          <CloudRain size={24} />
          <span className="weather-val">{data.weather.rainProb}%</span>
          <span className="weather-label">Rain Prob</span>
        </div>
      </section>

      {/* Soil Monitoring */}
      <section className="mb-4">
        <h2>Soil Monitoring</h2>
        <div className="card text-center relative overflow-hidden">
          <div className="circular-progress mb-4" style={{ '--value': data.soil.moisture }}>
            <div className="progress-value">
              {data.soil.moisture}%
              <span className="progress-label">Moisture</span>
            </div>
          </div>
          
          <div className="grid-3 mt-4">
            <div className="mini-card">
              <Thermometer size={20} className="icon-wrapper" />
              <div>
                <div style={{fontWeight: 700}}>{data.soil.temp}°C</div>
                <div style={{fontSize: 12, color: 'var(--text-muted)'}}>Temp</div>
              </div>
            </div>
            <div className="mini-card">
              <Droplets size={20} className="icon-wrapper" color="var(--primary-blue)" />
              <div>
                <div style={{fontWeight: 700}}>{data.soil.humidity}%</div>
                <div style={{fontSize: 12, color: 'var(--text-muted)'}}>Hum</div>
              </div>
            </div>
            <div className="mini-card">
              <Gauge size={20} className="icon-wrapper" color="var(--warning)" />
              <div>
                <div style={{fontWeight: 700}}>{data.soil.pressure}</div>
                <div style={{fontSize: 12, color: 'var(--text-muted)'}}>hPa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Insights */}
      <section className="mb-4">
        <h2>Smart Insights</h2>
        <div className={`card flex items-center gap-3 ${getRecommendation().includes('Optimal') ? 'glass' : ''}`} style={{ borderLeft: `4px solid ${getRecommendation().includes('Rain') ? 'gray' : getRecommendation().includes('Optimal') ? 'var(--success)' : 'var(--warning)'}` }}>
          {getRecommendation().includes('Optimal') ? (
            <CheckCircle size={24} color="var(--success)" />
          ) : (
            <AlertCircle size={24} color="var(--warning)" />
          )}
          <div style={{fontWeight: 600}}>{getRecommendation()}</div>
        </div>
      </section>

      {/* Irrigation Control */}
      <section className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2>Irrigation Control</h2>
          <span className={`badge ${isIrrigating ? 'badge-success' : 'badge-danger'}`}>
            {isIrrigating ? 'PUMP ON' : 'PUMP OFF'}
          </span>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div style={{fontSize: 14, color: 'var(--text-muted)'}}>Last Irrigated</div>
              <div style={{fontWeight: 600}}>{data.irrigation.lastIrrigated}</div>
            </div>
            <div className="text-right">
              <div style={{fontSize: 14, color: 'var(--text-muted)'}}>Month Total</div>
              <div style={{fontWeight: 600}}>{data.irrigation.countThisMonth} times</div>
            </div>
          </div>
          
          <button 
            className={`btn w-full ${isIrrigating ? 'btn-danger' : 'btn-primary'}`} 
            style={{ width: '100%' }}
            onClick={handleToggle}
          >
            <Power size={20} />
            {isIrrigating ? 'Stop Irrigation' : 'Start Irrigation'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
