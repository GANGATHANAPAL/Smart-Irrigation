import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Crop Data
  const CROP_DATA = [
    { id: 'rice', name: 'Rice', idealMoisture: [70, 90], waterReq: 'High', color: '#10B981' },
    { id: 'wheat', name: 'Wheat', idealMoisture: [30, 50], waterReq: 'Medium', color: '#F59E0B' },
    { id: 'tomato', name: 'Tomato', idealMoisture: [45, 60], waterReq: 'Medium', color: '#EF4444' },
    { id: 'sugarcane', name: 'Sugarcane', idealMoisture: [60, 80], waterReq: 'High', color: '#8B5CF6' },
  ];
  const [selectedCropId, setSelectedCropId] = useState('wheat');

  // Simulation State
  const [sensorData, setSensorData] = useState({
    weather: { temp: 28.5, humidity: 65, rainProb: 15, condition: 'Sunny' },
    soil: { moisture: 38.2, temp: 24.1, humidity: 60, pressure: 1012 },
    lastUpdated: 0
  });

  const [isOnline, setIsOnline] = useState(true);

  // Irrigation State
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [irrigationStartTime, setIrrigationStartTime] = useState(null);
  const [irrigationDurationMs, setIrrigationDurationMs] = useState(0);

  // History State
  const [history, setHistory] = useState([
    { id: 1, date: '19 Mar 2026', time: '06:30 AM', moisture: 30, duration: 25 },
    { id: 2, date: '18 Mar 2026', time: '07:15 AM', moisture: 28, duration: 30 },
  ]);

  // Settings
  const [settings, setSettings] = useState({
    moistureThreshold: 35,
    irrigationDuration: 20,
    autoMode: true,
  });

  // Simulate Data Changes over time (Real-time Simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => {
        const jitter = (val, maxDelta) => val + (Math.random() * maxDelta * 2 - maxDelta);
        const newMoisture = isIrrigating 
            ? Math.min(100, prev.soil.moisture + 1.2) // increase if irrigating
            : Math.max(0, prev.soil.moisture - 0.4); // decrease slowly
            
        return {
          ...prev,
          weather: {
            ...prev.weather,
            temp: parseFloat(jitter(prev.weather.temp, 0.4).toFixed(1)),
          },
          soil: {
            ...prev.soil,
            moisture: parseFloat(newMoisture.toFixed(1)),
            temp: parseFloat(jitter(prev.soil.temp, 0.2).toFixed(1)),
          },
          lastUpdated: 0 // reset counter
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isIrrigating]);

  // Last Updated Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({ ...prev, lastUpdated: prev.lastUpdated + 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Irrigation Timer
  useEffect(() => {
    let interval;
    if (isIrrigating && irrigationStartTime) {
      interval = setInterval(() => {
        setIrrigationDurationMs(Date.now() - irrigationStartTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isIrrigating, irrigationStartTime]);

  const toggleIrrigation = () => {
    if (!isIrrigating) {
      setIsIrrigating(true);
      setIrrigationStartTime(Date.now());
      setIrrigationDurationMs(0);
    } else {
      setIsIrrigating(false);
      const end = Date.now();
      const mins = Math.max(1, Math.round((end - irrigationStartTime) / 60000));
      const newHistory = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        moisture: sensorData.soil.moisture,
        duration: mins
      };
      setHistory(prev => [newHistory, ...prev]);
      setIrrigationStartTime(null);
    }
  };

  const activeCrop = CROP_DATA.find(c => c.id === selectedCropId);

  // AI Logic calculation
  const getAiDecision = () => {
    if (!isOnline) {
      if (sensorData.soil.moisture < settings.moistureThreshold) {
        return { 
          recommendation: "Irrigation Recommended", 
          logic: `Offline Mode: Sensor moisture (${sensorData.soil.moisture}%) is below configured auto-threshold (${settings.moistureThreshold}%).`,
          status: 'warning'
        };
      }
      return { 
        recommendation: "Soil Moisture Optimal", 
        logic: `Offline Mode: Sensor moisture (${sensorData.soil.moisture}%) is above configured threshold (${settings.moistureThreshold}%). No action needed.`,
        status: 'success'
      };
    }

    if (sensorData.weather.rainProb >= 50) {
      return {
        recommendation: "Irrigation Delayed",
        logic: `Rain probability is high (${sensorData.weather.rainProb}%). Delaying irrigation to utilize natural rainfall and save water.`,
        status: 'info'
      };
    }

    if (sensorData.soil.moisture < activeCrop.idealMoisture[0]) {
      return {
        recommendation: "Irrigation Recommended",
        logic: `Soil moisture (${sensorData.soil.moisture}%) has fallen below the ideal minimum range for ${activeCrop.name} (${activeCrop.idealMoisture[0]}%). Rain probability is low.`,
        status: 'danger'
      };
    }

    return {
      recommendation: "Soil Moisture Optimal",
      logic: `Soil moisture (${sensorData.soil.moisture}%) is within optimal range for ${activeCrop.name} (${activeCrop.idealMoisture[0]}% - ${activeCrop.idealMoisture[1]}%).`,
      status: 'success'
    };
  };

  // Smart Alerts
  const getAlerts = () => {
    const alerts = [];
    if (sensorData.weather.temp > 35) {
      alerts.push({ id: 'temp', msg: 'High temperature detected! Increased evaporation expected.', type: 'danger' });
    }
    if (sensorData.soil.moisture < 20) {
      alerts.push({ id: 'dry', msg: 'Soil critically dry! Immediate irrigation needed.', type: 'danger' });
    }
    if (isOnline && sensorData.weather.rainProb >= 50) {
      alerts.push({ id: 'rain', msg: 'Rain expected in next 3 hours – Irrigation delayed.', type: 'info' });
    }
    return alerts;
  };

  return (
    <AppContext.Provider value={{
      CROP_DATA,
      selectedCropId, setSelectedCropId, activeCrop,
      sensorData,
      isOnline, setIsOnline,
      isIrrigating, toggleIrrigation, irrigationDurationMs,
      history,
      settings, setSettings,
      getAiDecision,
      getAlerts
    }}>
      {children}
    </AppContext.Provider>
  );
};
