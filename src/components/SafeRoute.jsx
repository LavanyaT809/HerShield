import React from 'react';
import './SafeRoute.css';

const SafeRoute = () => {
  return (
    <div className="saferoute-container">
      <div className="saferoute-box">
        <h2>Safe Route Suggestion</h2>
        <div className="input-group">
          <label>Start Location</label>
          <div className="input-field">
            <input type="text" placeholder="Add location" />
            <span className="icon">+</span>
          </div>
        </div>
        <div className="input-group">
          <label>Destination</label>
          <div className="input-field">
            <input type="text" placeholder="Add location" />
            <span className="icon">⚙️</span>
          </div>
        </div>
        <button className="suggest-button">Suggest Safe Route</button>
      </div>
      <div className="sos-button">+ SOS</div>
    </div>
  );
};

export default SafeRoute;
