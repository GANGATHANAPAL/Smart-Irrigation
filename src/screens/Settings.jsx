import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, RefreshCw, Cpu, Smartphone } from 'lucide-react';

const Settings = () => {
  const [config, setConfig] = useState({
    moistureThreshold: 35,
    irrigationDuration: 20,
    autoMode: true,
  });
  
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings">
      <header className="app-header">
        <div>
          <h1>Settings</h1>
          <p>System configuration preferences</p>
        </div>
        <SettingsIcon size={28} color="var(--primary-blue)" opacity={0.5} />
      </header>

      <section className="mb-4">
        <h2>Operation Mode</h2>
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{ background: config.autoMode ? 'var(--success)' : 'var(--text-muted)', color: 'white', padding: 10, borderRadius: '12px', transition: 'all 0.3s' }}>
                <Cpu size={20} />
              </div>
              <div className="flex-col">
                <div style={{fontWeight: 600, fontSize: 16}}>Hybrid / Auto Mode</div>
                <div style={{fontSize: 13, color: 'var(--text-muted)'}}>Uses weather API + sensor data</div>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <label className="toggle-switch" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={config.autoMode}
                onChange={() => setConfig({...config, autoMode: !config.autoMode})}
                style={{ display: 'none' }}
              />
              <div style={{
                width: 48, height: 26, borderRadius: 26, 
                background: config.autoMode ? 'var(--primary-green)' : '#CBD5E1',
                position: 'relative', transition: 'background 0.3s'
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: 'white',
                  position: 'absolute', top: 3, left: config.autoMode ? 25 : 3,
                  transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}/>
              </div>
            </label>
          </div>
          
          <div className="mt-4 pt-4" style={{borderTop: '1px solid #E2E8F0', display: 'flex', gap: 12}}>
            <Smartphone size={16} color="var(--primary-blue)" />
            <span style={{fontSize: 13, color: 'var(--text-muted)'}}>
              If offline, the node falls back to sensor-only constraints.
            </span>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <h2>Threshold Parameters</h2>
        <div className="card">
          <div className="form-group mb-4">
            <div className="flex justify-between mb-2">
              <label style={{fontWeight: 600}}>Start Irrigation (Moisture &lt; %)</label>
              <span className="badge" style={{background: 'rgba(52, 152, 219, 0.1)', color: 'var(--primary-blue)'}}>{config.moistureThreshold}%</span>
            </div>
            <input 
              type="range" 
              className="w-full"
              min="10" max="80"
              value={config.moistureThreshold}
              onChange={(e) => setConfig({...config, moistureThreshold: parseInt(e.target.value)})}
              style={{ accentColor: 'var(--primary-blue)' }}
            />
          </div>

          <div className="form-group">
            <div className="flex justify-between mb-2">
              <label style={{fontWeight: 600}}>Default Duration (Minutes)</label>
              <span className="badge" style={{background: 'rgba(52, 152, 219, 0.1)', color: 'var(--primary-blue)'}}>{config.irrigationDuration}m</span>
            </div>
            <input 
              type="range" 
              className="w-full"
              min="5" max="120" step="5"
              value={config.irrigationDuration}
              onChange={(e) => setConfig({...config, irrigationDuration: parseInt(e.target.value)})}
              style={{ accentColor: 'var(--primary-green)' }}
            />
          </div>
        </div>
      </section>

      <div className="grid-2">
        <button className="btn" style={{ background: '#F1F5F9', color: 'var(--text-main)', border: '1px solid #CBD5E1' }}>
          <RefreshCw size={18} /> Error Reset
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={18} /> {saved ? 'Saved' : 'Save'}
        </button>
      </div>

    </div>
  );
};

export default Settings;
