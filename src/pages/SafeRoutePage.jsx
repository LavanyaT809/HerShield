import React, { useState, useRef } from "react";
import SafeRoute from "../components/SafeRoute.jsx";
import "../styles/SafeRoutePage.css";

const SafeRoutePage = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [showMap, setShowMap] = useState(false);
  const mapContainerRef = useRef(null);

  const handleSuggestClick = () => {
    if (!source || !destination) {
      alert("Please enter both a source and destination.");
      return;
    }
    setShowMap(true);
    setTimeout(() => {
      mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSuggestClick();
    }
  };

  return (
    <div 
      className="safe-route-page-container"
      style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2MYiewMszHp_0_Zxb2z2C4FMbvnSB8bZrQg&s')` }}
    >
      <div className="route-suggestion-card">
        <h1>Safe Route Suggestion</h1>
        <div className="route-controls">
          <div className="input-group">
            <label>Start Location</label>
            <input 
              type="text" 
              value={source}
              onChange={(e) => setSource(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add location" 
            />
          </div>
          <div className="input-group">
            <label>Destination</label>
            <input 
              type="text" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add location" 
            />
          </div>
          <button onClick={handleSuggestClick}>Suggest Safe Route</button>
        </div>
      </div>

      {showMap && (
        <div ref={mapContainerRef} className="map-container">
          <SafeRoute source={source} destination={destination} />
        </div>
      )}

      <div className="sos-button-container">
        <button className="sos-button">SOS</button>
      </div>
    </div>
  );
};

export default SafeRoutePage;
