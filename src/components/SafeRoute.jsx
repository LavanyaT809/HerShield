
import React, { useEffect, useRef } from 'react';

const SafeRoute = ({ source, destination }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const routeLayer = useRef(null);
  const srcMarker = useRef(null);
  const dstMarker = useRef(null);

  // ----- CONFIG (from original file) -----
  const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjRjNTc2YWVlMTAzZjQ3Mjc5OTc0M2FlOTI1ZTAwNmE1IiwiaCI6Im11cm11cjY0In0=";
  const CRIME_JSON = "/crime_areas_latlong.json"; // Path from public folder
  const RADIUS_BY_RISK = { low: 200, medium: 350, high: 600 };
  const MAX_RADIUS_CAP = { low: 300, medium: 500, high: 800 };
  let crimeAreas = [];

  // ----- UTILS (from original file, kept as is) -----
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function getLatLon(c) {
    const lat = Number(c.lat ?? c.latitude);
    const lon = Number(c.lon ?? c.lng ?? c.longitude);
    return [lat || null, lon || null];
  }
  function circleToPolygon(lat, lng, radiusMeters, points = 40) {
    const coords = [];
    const R = 6378137;
    const latRad = lat * Math.PI / 180;
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * 2 * Math.PI;
      const dLat = (radiusMeters * Math.cos(angle)) / R;
      const dLng = (radiusMeters * Math.sin(angle)) / (R * Math.cos(latRad));
      coords.push([lng + (dLng * 180 / Math.PI), lat + (dLat * 180 / Math.PI)]);
    }
    coords.push(coords[0]);
    return coords;
  }
  async function geocode(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const resp = await fetch(url, { headers: { "Accept-Language": "en" } });
    const data = await resp.json();
    if (!data || data.length === 0) throw new Error("Location not found: " + address);
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  function withinBBox(lat, lon, aLat, aLon, bLat, bLon, paddingKm = 8) {
      const padDeg = paddingKm / 111;
      const minLat = Math.min(aLat, bLat) - padDeg;
      const maxLat = Math.max(aLat, bLat) + padDeg;
      const minLon = Math.min(aLon, bLon) - padDeg;
      const maxLon = Math.max(aLon, bLon) + padDeg;
      return lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon;
  }
    
function isPointInPolygon(point, polygon) {
    const [lat, lon] = point;
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        const intersect = ((yi > lat) !== (yj > lat))
            && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    return isInside;
}


  // Effect to initialize the map
  useEffect(() => {
    if ( !mapRef.current || mapInstance.current) return; 

    if (!window.L) {
      console.error("Leaflet library not found. Please ensure it's loaded.");
      return;
    }

    const L = window.L;
    const pune = [18.5204, 73.8567];
    mapInstance.current = L.map(mapRef.current).setView(pune, 12);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(mapInstance.current);

    const hotspotsLayer = L.layerGroup().addTo(mapInstance.current);
    
    const legend = L.control({ position: "bottomleft" });
    legend.onAdd = function () {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML = `
          <div style="font-weight:700;margin-bottom:6px; color: white;">Legend</div>
          <div class="item"><span class="dot" style="background:green"></span> Low (visible only)</div>
          <div class="item"><span class="dot" style="background:orange"></span> Medium (avoided)</div>
          <div class="item"><span class="dot" style="background:red"></span> High (avoided)</div>
          <div style="margin-top:6px;font-size:12px;color:#aaa">If safe route fails, fallback normal route (orange dashed).</div>
        `;
        return div;
    };
    legend.addTo(mapInstance.current);

    fetch(CRIME_JSON)
      .then(resp => resp.json())
      .then(data => {
        crimeAreas = data;
        crimeAreas.forEach((c) => {
          const [lat, lon] = getLatLon(c);
          if (!lat || !lon) return;
          let base = Number(c.radius) || RADIUS_BY_RISK[c.risk] || 200;
          const cap = MAX_RADIUS_CAP[c.risk] || 600;
          const radius = clamp(base, 100, cap);
          const color = c.color || (c.risk === "high" ? "red" : c.risk === "medium" ? "orange" : "green");

          const tooltipContent = `
            <b>${c.station || "Station"}</b><br>
            <b>Risk:</b> ${c.risk}<br>
            <b>Cases:</b> ${c.cases ?? "N/A"}<br>
            <b>Description:</b> ${c.description}
          `;

          const popupContent = `
            ${tooltipContent}
            <br><br>
            <button onclick="window.open('https://www.google.com/maps?q&layer=c&cbll=${lat},${lon}', '_blank')" class="street-view-btn">Street View</button>
          `;

          L.circle([lat, lon], {
            radius,
            color,
            fillColor: color,
            fillOpacity: 0.25,
            weight: 1.2,
          })
          .bindTooltip(tooltipContent, {sticky: true})
          .bindPopup(popupContent)
          .addTo(hotspotsLayer);
        });
         calculateSafeRoute(); // Calculate route after crime data is loaded
      })
      .catch(err => {
        console.error("Crime JSON load failed:", err);
        alert("Failed to load crime hotspots JSON.");
      });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [source, destination]); 

  const calculateSafeRoute = async () => {
      if (!ORS_API_KEY || ORS_API_KEY === "YOUR_ORS_API_KEY_HERE") {
        alert("Set your ORS API key in the component file.");
        return;
      }
      if (!source || !destination) {
        alert("Enter both source and destination");
        return;
      }

      try {
        const [srcLat, srcLon] = await geocode(source);
        const [dstLat, dstLon] = await geocode(destination);

        if (isNaN(srcLat) || isNaN(srcLon) || isNaN(dstLat) || isNaN(dstLon)) {
            throw new Error(`Geocoding failed. One or both coordinates are invalid. Src: [${srcLat}, ${srcLon}], Dst: [${dstLat}, ${dstLon}]`);
        }
        
        const L = window.L;
        const map = mapInstance.current;

        if (srcMarker.current) map.removeLayer(srcMarker.current);
        if (dstMarker.current) map.removeLayer(dstMarker.current);
        if (routeLayer.current) map.removeLayer(routeLayer.current);

        srcMarker.current = L.marker([srcLat, srcLon]).addTo(map).bindPopup(`<b>Source:</b> ${source}`).openPopup();
        dstMarker.current = L.marker([dstLat, dstLon]).addTo(map).bindPopup(`<b>Destination:</b> ${destination}`);

        const avoidGeo = buildAvoidGeoFor(srcLat, srcLon, dstLat, dstLon);

        try {
          // 1. Calculate Fastest Route
          const fastestRoute = await requestRoute(srcLat, srcLon, dstLat, dstLon, null);
          const fastestRouteDuration = fastestRoute.features[0].properties.summary.duration;

          // 2. Calculate Safest Route
          let safeRoute;
          if (avoidGeo) {
            safeRoute = await requestRoute(srcLat, srcLon, dstLat, dstLon, avoidGeo);
          } else {
            safeRoute = fastestRoute; 
          }
          const safeRouteDuration = safeRoute.features[0].properties.summary.duration;
          
          // 3. Compare and generate explainability text
          const timeDifference = safeRouteDuration - fastestRouteDuration;
          const fastestRouteCoords = fastestRoute.features[0].geometry.coordinates.map(c => [c[1], c[0]]);
          
          let avoidedHighRiskCount = 0;
          let avoidedMediumRiskCount = 0;
          let explanationText = "";

          crimeAreas.forEach(area => {
            const [lat, lon] = getLatLon(area);
            if (!lat || !lon) return;

            const risk = (area.risk || "").toLowerCase();
            if(risk !== 'high' && risk !== 'medium') return;

            let base = Number(area.radius) || RADIUS_BY_RISK[risk] || 350;
            const cap = MAX_RADIUS_CAP[risk] || 600;
            const radius = clamp(base, 100, cap);
            
            const polygon = circleToPolygon(lat, lon, radius);
            
            for(const coord of fastestRouteCoords) {
                if(isPointInPolygon(coord, polygon)) {
                    if(risk === 'high') avoidedHighRiskCount++;
                    if(risk === 'medium') avoidedMediumRiskCount++;
                    break; 
                }
            }
          });

          if (timeDifference > 0) {
            const timeDiffMinutes = (timeDifference / 60).toFixed(1);
            explanationText = `This route is ${timeDiffMinutes} minutes longer to avoid ${avoidedHighRiskCount} high-risk and ${avoidedMediumRiskCount} medium-risk areas.`;
          } else {
            explanationText = "This is the safest and fastest route, as the risk zones do not intersect the optimal path.";
          }

          // 4. Draw the route and bind the tooltip
          drawRouteGeojson(safeRoute, { color: "#3388ff", weight: 5, opacity: 0.8 }, explanationText);

        } catch (err) {
          console.warn("Safe route failed, fallback to normal route:", err);
          const fallback = await requestRoute(srcLat, srcLon, dstLat, dstLon, null);
          drawRouteGeojson(fallback, { color: "#ffc107", weight: 5, dashArray: "10, 10" }, "Safe route calculation failed. This is the fastest route.");
          alert("Safe route calculation failed. Showing a normal route instead.");
        }
      } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
      }
  };

  const requestRoute = async (srcLat, srcLon, dstLat, dstLon, avoidGeo = null) => {
      const body = { 
        coordinates: [[srcLon, srcLat], [dstLon, dstLat]],
        instructions: false, 
        preference: "fastest"
      };
      if (avoidGeo) body.options = { avoid_polygons: avoidGeo };

      const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ORS_API_KEY,
        },
        body: JSON.stringify(body),
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`ORS error ${resp.status}: ${txt}`);
      }
      return resp.json();
  };

  const buildAvoidGeoFor = (srcLat, srcLon, dstLat, dstLon) => {
      const polygons = [];
      crimeAreas.forEach((c) => {
        const [lat, lon] = getLatLon(c);
        if (!lat || !lon) return;
        const risk = (c.risk || "").toLowerCase();
        if (risk !== "medium" && risk !== "high") return;
        let base = Number(c.radius) || RADIUS_BY_RISK[risk] || 350;
        const cap = MAX_RADIUS_CAP[risk] || 600;
        const radius = clamp(base, 100, cap);
        if (!withinBBox(lat, lon, srcLat, srcLon, dstLat, dstLon, 8)) return;
        polygons.push(circleToPolygon(lat, lon, radius));
      });
      if (polygons.length === 0) return null;
      return { type: "MultiPolygon", coordinates: polygons.map((p) => [p]) };
  };
  
  const drawRouteGeojson = (geojson, style, explanation) => {
      if (routeLayer.current) {
        mapInstance.current.removeLayer(routeLayer.current);
      }
      const L = window.L;
      const coords = geojson.features[0].geometry.coordinates.map((c) => [c[1], c[0]]);
      routeLayer.current = L.polyline(coords, style).addTo(mapInstance.current);

      if (explanation) {
        routeLayer.current.bindTooltip(explanation, { sticky: true }).openTooltip();
      }

      mapInstance.current.fitBounds(routeLayer.current.getBounds(), { padding: [40, 40] });
  };

  return (
      <div ref={mapRef} id="map" style={{ height: '600px', width: '100%' }}></div>
  );
};

export default SafeRoute;
