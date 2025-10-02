import React, { useState, useEffect } from 'react';
import './SOSScreen.css';
import { FaShieldAlt, FaHospital, FaBuilding, FaUser, FaArrowLeft } from 'react-icons/fa';

const SOSScreen = ({ onClose }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const handleSuccess = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const handleError = () => {
      setError('Unable to retrieve your location. Please grant permission.');
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return (
    <div className="sos-screen">
      <div className="sos-header">
        <button onClick={onClose} className="back-button">
          <FaArrowLeft />
        </button>
        <h1>Real-Time Location Sharing</h1>
      </div>
      <div className="map-container">
        <div className="map-placeholder">
          <div className="street-view">
            {location ? (
              <iframe
                title="Street View"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/streetview?key=YOUR_API_KEY&location=${location.lat},${location.lng}`}
                allowFullScreen
              ></iframe>
            ) : (
              <div className="location-status">
                {error ? <p>{error}</p> : <p>Requesting location permission...</p>}
              </div>
            )}
          </div>
        </div>
        <div className="location-alert">
            <p>Alert with live location sent to emergency contacts.</p>
        </div>
      </div>
      <div className="location-actions">
        <button className="stop-sharing">Stop Sharing</button>
        <button className="share-location">Share Location</button>
      </div>
      <div className="safe-zones">
        <h2>Nearby Safe Zones</h2>
        <ul>
          <li>
            <FaShieldAlt className="icon" />
            <div>
              <p>Safe Park</p>
              <span>2 miles away</span>
            </div>
          </li>
          <li>
            <FaHospital className="icon" />
            <div>
              <p>Community Hospital</p>
              <span>1.5 miles away</span>
            </div>
          </li>
          <li>
            <FaBuilding className="icon" />
            <div>
              <p>Local Police Station</p>
              <span>3 miles away</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="trusted-contacts">
        <h2>Trusted Contacts</h2>
        <ul>
        <li>
            <FaUser className="icon" />
            <div>
              <p>Lavanya Tuptewar</p>
              <span>Online</span>
            </div>
          </li>
          <li>
            <FaUser className="icon" />
            <div>
              <p>Isha Thakur</p>
              <span>Online</span>
            </div>
          </li>
          <li>
            <FaUser className="icon" />
            <div>
              <p>Rudrani Sarangdhar</p>
              <span>Online</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SOSScreen;