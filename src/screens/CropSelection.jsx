import React, { useState } from 'react';
import { Sprout, Check, Info } from 'lucide-react';

const CROP_DATA = [
  { id: 'rice', name: 'Rice', idealMoisture: '70-90%', waterReq: 'High', color: '#10B981' },
  { id: 'wheat', name: 'Wheat', idealMoisture: '30-50%', waterReq: 'Medium', color: '#F59E0B' },
  { id: 'tomato', name: 'Tomato', idealMoisture: '45-60%', waterReq: 'Medium', color: '#EF4444' },
  { id: 'sugarcane', name: 'Sugarcane', idealMoisture: '60-80%', waterReq: 'High', color: '#8B5CF6' },
];

const CropSelection = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="crop-selection">
      <header className="app-header">
        <div>
          <h1>Crop Management</h1>
          <p>Optimize parameters by crop type</p>
        </div>
      </header>

      <div className="card glass flex gap-3 mb-4" style={{ backgroundColor: 'rgba(52, 152, 219, 0.05)' }}>
        <Info size={24} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: 13, lineHeight: '1.4' }}>
          By selecting a specific crop, our AI re-calculates the Evapotranspiration and moisture thresholds required for optimal yield.
        </p>
      </div>

      <div className="grid-2 mb-4">
        {CROP_DATA.map(crop => (
          <div 
            key={crop.id}
            className={`card ${selectedCrop === crop.id ? 'active' : ''}`}
            onClick={() => setSelectedCrop(crop.id)}
            style={{ 
              cursor: 'pointer',
              marginBottom: 0,
              padding: 16,
              border: selectedCrop === crop.id ? `2px solid ${crop.color}` : '2px solid transparent',
              boxShadow: selectedCrop === crop.id ? 'var(--shadow-hover)' : 'var(--shadow-soft)',
              position: 'relative',
              transition: 'all 0.2s'
            }}
          >
            {selectedCrop === crop.id && (
              <div 
                style={{ 
                  position: 'absolute', top: 8, right: 8, 
                  background: crop.color, borderRadius: '50%', padding: 4, color: 'white' 
                }}
              >
                <Check size={14} />
              </div>
            )}
            
            <div 
              style={{ 
                background: `${crop.color}20`, 
                width: 48, height: 48, borderRadius: 12, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 12, color: crop.color
              }}
            >
              <Sprout size={24} />
            </div>
            <h3 style={{ marginBottom: 4 }}>{crop.name}</h3>
            <p style={{ fontSize: 12, marginBottom: 8 }}>Water: {crop.waterReq}</p>
            <div className="badge" style={{ backgroundColor: '#F1F5F9', color: 'var(--text-main)', width: '100%', justifyContent: 'center' }}>
              Moisture: {crop.idealMoisture}
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSave}>
        {isSaved ? 'Crop Profile Saved' : 'Save Configuration'}
      </button>
    </div>
  );
};

export default CropSelection;
