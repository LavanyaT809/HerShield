import React, { useState, useEffect, useRef } from 'react';
import './SafeGuard.css';

const SafeGuard = () => {
  const [stream, setStream] = useState(null);
  const [cameraStatus, setCameraStatus] = useState('Waiting for camera permissions...');
  const [locationStatus, setLocationStatus] = useState('Retrieving location...');
  const [isSafe, setIsSafe] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus(`Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocationStatus('Location access denied.');
        }
      );
    } else {
      setLocationStatus('Geolocation is not supported.');
    }
  }, []);

  const getCameraAccess = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraStatus('Camera access granted.');
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraStatus('Camera access denied.');
      }
    } else {
      setCameraStatus('Camera not supported.');
    }
  };

  const handleStopCamera = () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setCameraStatus('Waiting for camera permissions...');
    }
  };
  
  const toggleSafety = () => {
    setIsSafe(!isSafe);
  };

  return (
      <div id="safeguard" className="safeguard-container">
        <h1 className="main-title">SafeGuard Live Monitoring</h1>
        <div className="monitoring-layout">
          <div className="left-column">
            <div className="card camera-feed glass-container">
              <div className="camera-feed-header">
                <h2>Active Camera Feed</h2>
                {stream && <button onClick={handleStopCamera} className="stop-camera-btn">Stop Camera</button>}
              </div>
              <p>AI is analyzing the stream for threats and unusual behavior in real-time.</p>
              <div className="video-placeholder">
                <video ref={videoRef} autoPlay playsInline muted className="video-feed-active" style={{ display: stream ? 'block' : 'none' }}></video>
                {!stream && (
                  <div className="video-overlay">
                    <p>{cameraStatus}</p>
                    {cameraStatus !== 'Waiting for camera permissions...' && <button onClick={getCameraAccess} className="request-camera-btn">Request Camera Access</button>}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right-column">
            <div className="card system-status glass-container">
              <h2>System Status</h2>
              <div className={`status-indicator ${isSafe ? 'safe' : 'unsafe'}`}></div>
              <p className="status-text">{isSafe ? 'Monitoring: Safe' : 'Monitoring: Not Safe'}</p>
              <p className="location-text">Location: {locationStatus}</p>
            </div>
            <div className="card immediate-action glass-container">
              <h2>Immediate Action</h2>
              <button className="sos-trigger">MANUAL SOS TRIGGER</button>
              <p>Activates immediate alert to police with location and live frame capture.</p>
            </div>
            <div className="card ai-settings glass-container">
                <h2>AI Anomaly Simulation</h2>
                <button onClick={toggleSafety} className="toggle-safety-btn">
                    {isSafe ? 'Simulate Anomaly' : 'Return to Safe State'}
                </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SafeGuard;
