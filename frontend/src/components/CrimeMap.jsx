import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ShieldAlert, MapPin, Eye, Zap, Layers, RefreshCw, AlertTriangle, HeartHandshake, AlertOctagon } from 'lucide-react';

// Custom Marker icons with neon styling
const createCustomMarker = (severity, type) => {
  let color = '#06b6d4'; // default cyan
  let pulseColor = 'rgba(6, 182, 212, 0.4)';
  
  if (severity === 'Critical') {
    color = '#f43f5e'; // rose red
    pulseColor = 'rgba(244, 63, 94, 0.5)';
  } else if (severity === 'High') {
    color = '#f59e0b'; // amber
    pulseColor = 'rgba(245, 158, 11, 0.5)';
  } else if (severity === 'Medium') {
    color = '#3b82f6'; // blue
  }

  const svgIcon = `
    <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${pulseColor}; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="position: relative; width: 20px; height: 20px; border-radius: 50%; background: ${color}; border: 2px solid #0f172a; box-shadow: 0 0 10px ${color}; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: #000;">
        !
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: svgIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Component to dynamically re-center map on district change
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 12, { duration: 1.2 });
  }, [center, map]);
  return null;
}

export default function CrimeMap({
  incidents = [],
  hotspots = [],
  womenSafetyAreas = [],
  onSelectIncident,
  onOpenEmergencyMode
}) {
  const [showHotspots, setShowHotspots] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showWomenSafety, setShowWomenSafety] = useState(false);
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Bengaluru, Karnataka Center
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIncidents = incidents.filter((inc) => {
    if (selectedCategory === 'All') return true;
    return inc.type === selectedCategory;
  });

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl h-[550px] flex flex-col">
      {/* Map Control Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-[500] flex flex-wrap items-center justify-between gap-3 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-800/80 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/30">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>KSP GIS TACTICAL GRID</span>
          </div>

          {/* Incident Type Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Armed Robbery">Armed Robbery</option>
            <option value="Cyber Crime">Cyber Crime</option>
            <option value="Narcotics">Narcotics</option>
            <option value="Vehicle Theft">Vehicle Theft</option>
            <option value="Gang Activity">Gang Activity</option>
          </select>
        </div>

        {/* Toggle Switches */}
        <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
              showIncidents
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            Incidents ({filteredIncidents.length})
          </button>

          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
              showHotspots
                ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            Hotspots ({hotspots.length})
          </button>

          <button
            onClick={() => setShowWomenSafety(!showWomenSafety)}
            className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
              showWomenSafety
                ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            Women Safety Heat
          </button>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <MapContainer
        center={mapCenter}
        zoom={12}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
      >
        <MapRecenter center={mapCenter} />

        {/* CartoDB Dark Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> Map data &copy; <a href="https://openstreetmap.org">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Hotspot Circles Layer */}
        {showHotspots &&
          hotspots.map((hs) => (
            <Circle
              key={hs.id}
              center={[hs.latitude, hs.longitude]}
              radius={hs.intensity * 900}
              pathOptions={{
                color: hs.risk_level === 'CRITICAL' ? '#f43f5e' : '#f59e0b',
                fillColor: hs.risk_level === 'CRITICAL' ? '#f43f5e' : '#f59e0b',
                fillOpacity: 0.25,
                weight: 1.5,
                dashArray: '4, 4'
              }}
            >
              <Popup>
                <div className="p-1 font-sans">
                  <div className="flex items-center space-x-1 text-rose-400 font-mono text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>HOTSPOT ZONE: {hs.name}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Primary Threat: <strong>{hs.primary_threat}</strong></p>
                  <p className="text-[11px] text-slate-400">Rec Officers: {hs.recommended_officers}</p>
                </div>
              </Popup>
            </Circle>
          ))}

        {/* Women Safety Heat Circles */}
        {showWomenSafety &&
          womenSafetyAreas.map((wsa) => (
            <Circle
              key={wsa.id}
              center={wsa.coords}
              radius={1000}
              pathOptions={{
                color: wsa.safety_score < 50 ? '#f43f5e' : '#10b981',
                fillColor: wsa.safety_score < 50 ? '#f43f5e' : '#10b981',
                fillOpacity: 0.2,
                weight: 1.5
              }}
            >
              <Popup>
                <div className="p-1 font-sans font-mono text-xs">
                  <div className="font-bold text-slate-100">{wsa.area_name}</div>
                  <div className="text-rose-400">Women Safety Index: {wsa.safety_score}/100</div>
                  <div className="text-slate-400 text-[10px]">112 Calls: {wsa.namma_112_calls_24h} calls/24h</div>
                </div>
              </Popup>
            </Circle>
          ))}

        {/* Incidents Markers Layer */}
        {showIncidents &&
          filteredIncidents.map((inc) => (
            <Marker
              key={inc.id}
              position={[inc.latitude, inc.longitude]}
              icon={createCustomMarker(inc.severity, inc.type)}
              eventHandlers={{
                click: () => onSelectIncident && onSelectIncident(inc)
              }}
            >
              <Popup>
                <div className="p-2 space-y-2 font-sans">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                    <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
                      {inc.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        inc.severity === 'Critical' ? 'bg-rose-950 text-rose-400' : 'bg-amber-950 text-amber-400'
                      }`}
                    >
                      {inc.severity.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-100">{inc.title}</h4>
                  <p className="text-xs text-slate-300">{inc.location}</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-900 p-2 rounded border border-slate-800 font-mono">
                    <div>
                      <span className="text-slate-500 block">Risk Score</span>
                      <span className="font-extrabold text-cyan-400">{inc.risk_score}/100</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Assigned</span>
                      <span className="text-slate-200 text-[10px]">{inc.assigned_unit}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => onSelectIncident && onSelectIncident(inc)}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-1 rounded transition cursor-pointer"
                    >
                      View Details
                    </button>

                    {onOpenEmergencyMode && inc.severity === 'Critical' && (
                      <button
                        onClick={() => onOpenEmergencyMode(inc)}
                        className="w-full bg-rose-600 hover:bg-rose-500 text-slate-950 font-bold text-xs py-1 rounded transition cursor-pointer flex items-center justify-center space-x-1"
                      >
                        <AlertOctagon className="w-3.5 h-3.5" />
                        <span>Activate Emergency Command</span>
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[500] bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 font-mono space-y-1.5 hidden sm:block">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
          KSP Grid Legend
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500"></span>
          <span>Critical Incident (Armed / Acoustic)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>High Severity (Narcotics / Snatching)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
          <span>Medium Risk (Cyber / Burglary)</span>
        </div>
      </div>
    </div>
  );
}
