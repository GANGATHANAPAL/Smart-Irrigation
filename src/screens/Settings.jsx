import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, RefreshCw, Cpu, Smartphone, Wifi, CloudOff } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
  const { settings, setSettings, isOnline, setIsOnline } = useAppContext();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings animate-fade-in">
      <header className="app-header">
        <div>
          <h1>Settings</h1>
          <p>System configuration preferences</p>
        </div>
        <SettingsIcon size={28} color="var(--primary-blue)" opacity={0.5} />
      </header>

      <section className="mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h2>Connectivity Mode</h2>
        <div className={`card ${isOnline ? 'border-l-success' : 'border-l-danger'} transition-all`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{ background: isOnline ? 'var(--success)' : 'var(--danger)', color: 'white', padding: 10, borderRadius: '12px', transition: 'all 0.3s' }}>
                {isOnline ? <Wifi size={20} /> : <CloudOff size={20} />}
              </div>
              <div className="flex-col">
                <div style={{fontWeight: 600, fontSize: 16}}>{isOnline ? 'Online / Smart Hybrid' : 'Offline / Local Airgap'}</div>
                <div style={{fontSize: 13, color: 'var(--text-muted)'}}>Toggle connection status</div>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <label className="toggle-switch" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={isOnline}
                onChange={() => setIsOnline(!isOnline)}
                style={{ display: 'none' }}
              />
              <div style={{
                width: 48, height: 26, borderRadius: 26, 
                background: isOnline ? 'var(--success)' : '#CBD5E1',
                position: 'relative', transition: 'background 0.3s'
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: 'white',
                  position: 'absolute', top: 3, left: isOnline ? 25 : 3,
                  transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}/>
              </div>
            </label>
          </div>
          
          <div className="mt-4 pt-4" style={{borderTop: '1px solid #E2E8F0', display: 'flex', gap: 12}}>
            <Smartphone size={16} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
            <span style={{fontSize: 13, color: 'var(--text-muted)'}}>
              When Offline, the system falls back exclusively to the static sensor thresholds configured below, bypassing the Weather Engine.
            </span>
          </div>
        </div>
      </section>

      <section className="mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2>Fallback Thresholds</h2>
        <div className="card shadow-hover">
          <div className="form-group mb-4">
            <div className="flex justify-between mb-2">
              <label style={{fontWeight: 600}}>Start Irrigation (Moisture &lt; %)</label>
              <span className="badge" style={{background: 'rgba(52, 152, 219, 0.1)', color: 'var(--primary-blue)'}}>{settings.moistureThreshold}%</span>
            </div>
            <input 
              type="range" 
              className="w-full"
              min="10" max="80"
              value={settings.moistureThreshold}
              onChange={(e) => setSettings({...settings, moistureThreshold: parseInt(e.target.value)})}
              style={{ accentColor: 'var(--primary-blue)' }}
            />
          </div>

          <div className="form-group">
            <div className="flex justify-between mb-2">
              <label style={{fontWeight: 600}}>Default Pump Duration</label>
              <span className="badge" style={{background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary-green)'}}>{settings.irrigationDuration}m</span>
            </div>
            <input 
              type="range" 
              className="w-full"
              min="5" max="120" step="5"
              value={settings.irrigationDuration}
              onChange={(e) => setSettings({...settings, irrigationDuration: parseInt(e.target.value)})}
              style={{ accentColor: 'var(--primary-green)' }}
            />
          </div>
        </div>
      </section>

      <div className="grid-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <button className="btn" style={{ background: '#F1F5F9', color: 'var(--text-main)', border: '1px solid #CBD5E1' }}>
          <RefreshCw size={18} /> Error Reset
        </button>
        <button className="btn btn-primary shadow-hover" onClick={handleSave}>
          <Save size={18} /> {saved ? 'Saved' : 'Save'}
        </button>
      </div>

    </div>
  );
};

export default Settings;
