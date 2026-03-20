import React from 'react';
import { 
  CloudRain, Sun, Cloud, Thermometer, Droplets, Gauge, Power, 
  Wifi, CloudOff, AlertTriangle, Info, Sprout, BrainCircuit
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const formatTimer = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const Dashboard = () => {
  const { 
    sensorData, isOnline, isIrrigating, toggleIrrigation, 
    irrigationDurationMs, history, activeCrop, getAiDecision, getAlerts 
  } = useAppContext();

  const decision = getAiDecision();
  const alerts = getAlerts();
  
  const recentHistory = history[0];
  const monthHistoryCount = history.length; // Approximated

  return (
    <div className="dashboard animate-fade-in">
      <header className="app-header" style={{ marginBottom: 16 }}>
        <div>
          <h1>Smart Dashboard</h1>
          <p className="flex items-center gap-2" style={{ fontSize: 13 }}>
            <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }}></span>
            Last updated: {sensorData.lastUpdated} seconds ago
          </p>
        </div>
      </header>

      {/* Hybrid Mode Indicator */}
      <div className={`card ${isOnline ? 'border-l-success' : 'border-l-danger'} mt-2 mb-4`} style={{ padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
        {isOnline ? (
           <Wifi size={24} color="var(--success)" />
        ) : (
           <CloudOff size={24} color="var(--danger)" />
        )}
        <div>
          <h3 style={{ fontSize: 14 }}>{isOnline ? '🟢 Online Mode Active' : '🔴 Offline Mode Active'}</h3>
          <p style={{ fontSize: 12 }}>{isOnline ? 'Using Weather API + Sensor telemetry' : 'Running in Offline Mode – Using sensor-based decisions'}</p>
        </div>
      </div>

      {/* Smart Alerts */}
      {alerts.length > 0 && (
        <div className="mb-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`alert-card bg-${alert.type} flex items-center gap-3 mb-2`}>
              {alert.type === 'danger' ? <AlertTriangle size={20} /> : <Info size={20} />}
              <span style={{ fontSize: 14, fontWeight: 500 }}>{alert.msg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Weather Summary */}
      <section className="weather-summary">
        <div className="weather-item">
          <Thermometer size={24} />
          <span className="weather-val">{sensorData.weather.temp}°C</span>
          <span className="weather-label">Temp</span>
        </div>
        <div className="weather-item" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
          <Droplets size={24} />
          <span className="weather-val">{sensorData.weather.humidity}%</span>
          <span className="weather-label">Humidity</span>
        </div>
        <div className="weather-item">
          <CloudRain size={24} />
          <span className="weather-val">{sensorData.weather.rainProb}%</span>
          <span className="weather-label">Rain Prob</span>
        </div>
      </section>

      {/* Crop intelligence & AI Decision Panel */}
      <section className="mb-4">
        <h2>AI Engine & Decision</h2>
        
        <div className="card glass ai-panel border-l-primary" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="flex justify-between items-center mb-3 pb-3" style={{ borderBottom: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-2">
              <Sprout size={18} color="var(--primary-green)" />
              <span style={{ fontWeight: 600, fontSize: 14 }}>Active Crop: {activeCrop.name}</span>
            </div>
            <div className="badge badge-success">Target: {activeCrop.idealMoisture[0]}-{activeCrop.idealMoisture[1]}%</div>
          </div>
          
          <div className="flex gap-3 mt-2 items-start">
            <BrainCircuit size={24} className={decision.status !== 'success' ? 'animate-pulse' : ''} color={`var(--${decision.status === 'success' ? 'success' : decision.status === 'info' ? 'primary-blue' : decision.status})`} style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: 15, color: `var(--${decision.status === 'success' ? 'success' : decision.status === 'info' ? 'primary-blue' : decision.status})`, marginBottom: 4 }}>
                {decision.recommendation}
              </h3>
              <p style={{ fontSize: 13, background: 'rgba(255,255,255,0.8)', padding: 10, borderRadius: 8, fontStyle: 'italic', border: '1px solid #E2E8F0' }}>
                {decision.logic}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Soil Monitoring */}
      <section className="mb-4">
        <h2>Telemetry Data</h2>
        <div className="card text-center relative overflow-hidden transition-all">
          <div className="circular-progress mb-4" style={{ '--value': sensorData.soil.moisture, transition: 'background 1s ease' }}>
            <div className="progress-value">
              {sensorData.soil.moisture}%
              <span className="progress-label">Moisture</span>
            </div>
          </div>
          
          <div className="grid-3 mt-4">
            <div className="mini-card transition-bg">
              <Thermometer size={20} className="icon-wrapper" color="var(--primary-green)" />
              <div>
                <div style={{fontWeight: 700}}>{sensorData.soil.temp}°C</div>
                <div style={{fontSize: 12, color: 'var(--text-muted)'}}>Temp</div>
              </div>
            </div>
            <div className="mini-card transition-bg">
              <Droplets size={20} className="icon-wrapper" color="var(--primary-blue)" />
              <div>
                <div style={{fontWeight: 700}}>{sensorData.soil.humidity}%</div>
                <div style={{fontSize: 12, color: 'var(--text-muted)'}}>Hum</div>
              </div>
            </div>
            <div className="mini-card transition-bg">
              <Gauge size={20} className="icon-wrapper" color="var(--warning)" />
              <div>
                <div style={{fontWeight: 700}}>{sensorData.soil.pressure}</div>
                <div style={{fontSize: 12, color: 'var(--text-muted)'}}>hPa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Irrigation Control */}
      <section className="mb-4">
        <h2>Interactive Control</h2>
        
        <div className={`card ${isIrrigating ? 'border-l-primary' : ''} transition-all`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <div style={{fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5}}>Last Irrigated</div>
              <div style={{fontWeight: 600, fontSize: 14}}>{recentHistory?.date || '-'}, {recentHistory?.time || '-'}</div>
            </div>
            <div className="text-right">
              <div style={{fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5}}>Month Total</div>
              <div style={{fontWeight: 600, fontSize: 14}}>{monthHistoryCount} events</div>
            </div>
          </div>
          
          <div className="flex-col items-center justify-center mb-4 text-center">
            {isIrrigating ? (
              <div className="mb-2">
                <span className="badge badge-success animate-pulse mb-1">IRRIGATION STARTED</span>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary-blue)' }}>
                  {formatTimer(irrigationDurationMs)}
                </div>
              </div>
            ) : (
                <div className="mb-2">
                  <span className="badge" style={{background: '#E2E8F0'}}>IRRIGATION STOPPED</span>
                </div>
            )}
          </div>

          <button 
            className={`btn w-full ${isIrrigating ? 'btn-danger custom-shadow-danger animate-pulse-slight' : 'btn-primary custom-shadow-primary'}`} 
            style={{ width: '100%', height: 56, fontSize: 18 }}
            onClick={toggleIrrigation}
          >
            <Power size={24} />
            {isIrrigating ? 'Stop Water Pump' : 'Start Water Pump'}
          </button>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
