import React, { useEffect, useState, useRef, useCallback } from 'react';
import './SafeGuard.css';

const SafeGuard = () => {
  const [locationStatus, setLocationStatus] = useState('Permission Denied');
  const [cameraStatus, setCameraStatus] = useState('Waiting for camera permissions...');
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const getCameraAccess = useCallback(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          setCameraStatus('Camera access granted');
          setStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          setCameraStatus('Waiting for camera permissions...');
          console.error("Camera access error:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus(`Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`);
        },
        (error) => {
          setLocationStatus('Permission Denied');
          console.error("Geolocation error:", error);
        }
      );
    }

    if (!stream) {
      getCameraAccess();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream, getCameraAccess]);

  const handleStopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraStatus('Camera access stopped');
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
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
            <div className="status-indicator"></div>
            <p className="status-text">Monitoring: Safe</p>
            <p className="location-text">Location: {locationStatus}</p>
          </div>
          <div className="card immediate-action glass-container">
            <h2>Immediate Action</h2>
            <button className="sos-trigger">MANUAL SOS TRIGGER</button>
            <p>Activates immediate alert to police with location and live frame capture.</p>
          </div>
          <div className="card ai-settings glass-container">
            <h2>AI Monitor Settings</h2>
            <div className="setting">
              <span>Enable AI Detection</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="detection-log">
              <h3>Detection Log</h3>
              <ul>
                <li>11:03:27 PM - Geolocation denied. SOS will send last known/IP location.</li>
                <li>11:00:00 - System Initialized.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeGuard;
