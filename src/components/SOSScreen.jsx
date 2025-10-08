import React, { useState, useEffect, useRef } from 'react';
import './SOSScreen.css';
import { FaShieldAlt, FaHospital, FaBuilding, FaUser, FaArrowLeft } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ORS raster tile endpoint
const ORS_RASTER_URL = "https://api.openrouteservice.org/mapsurfer/{z}/{x}/{y}.png?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjRjNTc2YWVlMTAzZjQ3Mjc5OTc0M2FlOTI1ZTAwNmE1IiwiaCI6Im11cm11cjY0In0=";

const SOSScreen = ({ onClose }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const leafletMap = useRef(null);

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
      },
      () => {
        setError('Unable to retrieve your location. Please grant permission.');
      }
    );
  };

  useEffect(() => {
    if (location && mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([location.lat, location.lng], 16);
      L.tileLayer(ORS_RASTER_URL, {
        attribution: "© OpenRouteService, OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(leafletMap.current);

      L.marker([location.lat, location.lng]).addTo(leafletMap.current)
        .bindPopup('Your live location')
        .openPopup();
    }
    if (leafletMap.current) {
      // Fix map size if container changes or is hidden initially
      leafletMap.current.invalidateSize();
    }
    // Cleanup on unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [location]);

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
              <div
                ref={mapRef}
                id="ors-map"
                style={{ width: '100%', height: '300px', borderRadius: '10px' }}
              />
            ) : (
              <div className="location-status">
                {error ? <p>{error}</p> : <p>Click "Share Location" to send your live location.</p>}
              </div>
            )}
          </div>
        </div>
        <div className="location-alert">
          <p>Alert with live location sent to emergency contacts.</p>
        </div>
      </div>

      <div className="location-actions">
        <button 
          className="stop-sharing" 
          onClick={() => {
            setLocation(null);
            setError(null);
            if (leafletMap.current) {
              leafletMap.current.remove();
              leafletMap.current = null;
            }
          }}
        >
          Stop Sharing
        </button>
        <button className="share-location" onClick={handleShareLocation}>Share Location</button>
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











// / import React, { useState, useEffect } from 'react';
// import './SOSScreen.css';
// import { FaShieldAlt, FaHospital, FaBuilding, FaUser, FaArrowLeft } from 'react-icons/fa';

// const SOSScreen = ({ onClose }) => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by your browser.');
//       return;
//     }

//     const handleSuccess = (position) => {
//       setLocation({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
//     };

//     const handleError = () => {
//       setError('Unable to retrieve your location. Please grant permission.');
//     };

//     navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
//   }, []);

//   return (
//     <div className="sos-screen">
//       <div className="sos-header">
//         <button onClick={onClose} className="back-button">
//           <FaArrowLeft />
//         </button>
//         <h1>Real-Time Location Sharing</h1>
//       </div>
//       <div className="map-container">
//         <div className="map-placeholder">
//           <div className="street-view">
//             {location ? (
//               <iframe
//                 title="Street View"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 src={`https://www.google.com/maps/embed/v1/streetview?key=YOUR_API_KEY&location=${location.lat},${location.lng}`}
//                 allowFullScreen
//               ></iframe>
//             ) : (
//               <div className="location-status">
//                 {error ? <p>{error}</p> : <p>Requesting location permission...</p>}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="location-alert">
//             <p>Alert with live location sent to emergency contacts.</p>
//         </div>
//       </div>
//       <div className="location-actions">
//         <button className="stop-sharing">Stop Sharing</button>
//         <button className="share-location">Share Location</button>
//       </div>
//       <div className="safe-zones">
//         <h2>Nearby Safe Zones</h2>
//         <ul>
//           <li>
//             <FaShieldAlt className="icon" />
//             <div>
//               <p>Safe Park</p>
//               <span>2 miles away</span>
//             </div>
//           </li>
//           <li>
//             <FaHospital className="icon" />
//             <div>
//               <p>Community Hospital</p>
//               <span>1.5 miles away</span>
//             </div>
//           </li>
//           <li>
//             <FaBuilding className="icon" />
//             <div>
//               <p>Local Police Station</p>
//               <span>3 miles away</span>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <div className="trusted-contacts">
//         <h2>Trusted Contacts</h2>
//         <ul>
//         <li>
//             <FaUser className="icon" />
//             <div>
//               <p>Lavanya Tuptewar</p>
//               <span>Online</span>
//             </div>
//           </li>
//           <li>
//             <FaUser className="icon" />
//             <div>
//               <p>Isha Thakur</p>
//               <span>Online</span>
//             </div>
//           </li>
//           <li>
//             <FaUser className="icon" />
//             <div>
//               <p>Rudrani Sarangdhar</p>
//               <span>Online</span>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SOSScreen;