import React, { useState } from 'react';
import { Sprout, Check, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CropSelection = () => {
  const { CROP_DATA, selectedCropId, setSelectedCropId } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (id) => {
    setSelectedCropId(id);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="crop-selection animate-fade-in">
      <header className="app-header">
        <div>
          <h1>Crop Intelligence</h1>
          <p>Optimize parameters by generic crop type</p>
        </div>
      </header>

      <div className="card glass flex gap-3 mb-4" style={{ backgroundColor: 'rgba(52, 152, 219, 0.05)', borderLeft: '4px solid var(--primary-blue)' }}>
        <Info size={24} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: 13, lineHeight: '1.4' }}>
          Our AI dynamically re-calculates the Evapotranspiration and ideal soil moisture thresholds required for your selected crop to maximize yield.
        </p>
      </div>

      <div className="grid-2 mb-4">
        {CROP_DATA.map((crop, i) => (
          <div 
            key={crop.id}
            className={`card shadow-hover animate-slide-up ${selectedCropId === crop.id ? 'active' : ''}`}
            onClick={() => handleSave(crop.id)}
            style={{ 
              animationDelay: `${i * 0.1}s`,
              cursor: 'pointer',
              marginBottom: 0,
              padding: 16,
              border: selectedCropId === crop.id ? `2px solid ${crop.color}` : '2px solid transparent',
              boxShadow: selectedCropId === crop.id ? 'var(--shadow-hover)' : 'var(--shadow-soft)',
              position: 'relative',
              transition: 'all 0.2s',
              transform: selectedCropId === crop.id ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            {selectedCropId === crop.id && (
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
            <p style={{ fontSize: 12, marginBottom: 8, color: 'var(--text-muted)' }}>Water Req: <span style={{fontWeight:600}}>{crop.waterReq}</span></p>
            <div className="badge" style={{ backgroundColor: '#F1F5F9', color: 'var(--text-main)', width: '100%', justifyContent: 'center', fontSize: 11 }}>
              Range: {crop.idealMoisture[0]}% - {crop.idealMoisture[1]}%
            </div>
          </div>
        ))}
      </div>

      {isSaved && (
        <div className="badge badge-success animate-fade-in" style={{ width: '100%', justifyContent: 'center', padding: 16, fontSize: 14 }}>
          <Check size={18} /> Crop Profile Successfully Synced!
        </div>
      )}
    </div>
  );
};

export default CropSelection;
